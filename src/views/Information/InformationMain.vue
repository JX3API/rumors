<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="logo-title">
        <el-icon :size="30" style="margin-right: 10px"><ChatDotRound /></el-icon>
        <h1>阿瓦达啃大瓜</h1>
      </div>
      <el-link href="#" type="primary" underline="hover" @click="openApiDocs">API 文档</el-link>
    </el-header>

    <el-main class="app-main">
      <el-row justify="center">
        <el-col :xs="24" :sm="20" :md="16" :lg="12">
          <el-card shadow="never" class="control-panel">
            <template #header>
              <div class="card-header">
                <span>开始啃大瓜！</span>
              </div>
            </template>

            <el-form :model="form" label-position="top" ref="formRef">
              <el-form-item label="帖子ID 或 链接" prop="gossip_id" :rules="[{ required: true, message: '请输入帖子ID或链接', trigger: 'blur' }]">
                <el-input v-model="form.gossip_id" placeholder="例如：1234567890 或 https://tieba.baidu.com/p/1234567890" clearable />
              </el-form-item>

              <el-form-item>
                <el-checkbox v-model="form.only_thread_author" label="只看楼主" size="large" />
              </el-form-item>

              <el-divider content-position="left">高级参数设置</el-divider>

              <el-form-item :label="`内容长度 (Max Output Tokens): ${form.max_output_tokens}`">
                <el-slider v-model="form.max_output_tokens" :min="50" :max="8192" :step="10" show-input />
              </el-form-item>

              <el-form-item :label="`随机性 (Temperature): ${form.temperature}`">
                <el-slider v-model="form.temperature" :min="0" :max="2" :step="0.01" show-input />
                <el-text size="small" type="info" style="margin-top: 5px"> 数值越高，结果越具创造性但可能不准确；数值越低，结果越保守和集中。 </el-text>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="isLoading" size="large" style="width: 100%" :icon="Promotion">
                  {{ isLoading ? '吃瓜中...' : '开始吃瓜' }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="never" class="results-panel" v-if="showResultsArea">
            <template #header>
              <div class="card-header">
                <span>吃瓜结果</span>
                <el-button v-if="summary" type="primary" link @click="copySummary" :icon="CopyDocument">复制结果</el-button>
              </div>
            </template>
            <div v-if="isLoading" v-loading="isLoading" element-loading-text="正在吃瓜中，请稍候..." style="min-height: 150px"></div>
            <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon :closable="false" />
            <div v-if="summary && !isLoading && !errorMessage" class="summary-content">
              <el-input v-model="summary" type="textarea" :autosize="{ minRows: 5 }" readonly />
            </div>
            <el-empty v-if="!summary && !isLoading && !errorMessage" description="暂无吃瓜结果，请先提交吃瓜任务" />
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- <el-footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} 啃大瓜啃大瓜啃大瓜啃大瓜啃大瓜啃大瓜</p>
    </el-footer> -->
  </el-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Promotion, CopyDocument, ChatDotRound } from '@element-plus/icons-vue' // 引入图标
import axios from 'axios'
const formRef = ref(null)
const form = reactive({
  gossip_id: '',
  only_thread_author: false, // 对应截图中的 "True"
  max_output_tokens: 2048, // 对应截图中的 2048
  temperature: 0, // 对应截图中的 0 (但 temperature 通常不会是0，0.7是个常用值)
})

const isLoading = ref(false)
const summary = ref('')
const errorMessage = ref('')

const showResultsArea = computed(() => isLoading.value || summary.value || errorMessage.value)

const handleSubmit = () => {
  console.log(import.meta.env)

  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      summary.value = ''
      errorMessage.value = ''
      const { data } = await axios.post(import.meta.env.VITE_APP_BASEAPI + '/gossip/api/summary', form)
      if (data.code == 200) {
        ElMessage.success('吃瓜完成！')
        isLoading.value = false
        summary.value = `标题：${data.data.title}\r\n一句话：${data.data.abstract}\r\n关键字：${data.data.keywords}\r\n人物：${data.data.characters}\r\n类型：${data.data.category}\r\n内容：${data.data.summary}`
      } else {
        errorMessage.value = '吃瓜失败，无法连接到AI服务或帖子ID无效。请稍后重试。'
        ElMessage.error('吃瓜失败！')
        isLoading.value = false
      }
    } else {
      ElMessage.error('请检查输入项！')
      return false
    }
  })
}

const copySummary = () => {
  if (navigator.clipboard && summary.value) {
    navigator.clipboard
      .writeText(summary.value)
      .then(() => {
        ElMessage.success('结果已复制到剪贴板！')
      })
      .catch((err) => {
        ElMessage.error('复制失败: ' + err)
      })
  } else {
    ElMessage.warning('没有可复制的内容或浏览器不支持。')
  }
}

const openApiDocs = () => {
  window.open('https://gossip.jx3tool.com/docs')
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #409eff; /* Element Plus 主题色 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.logo-title {
  display: flex;
  align-items: center;
}

.logo-title h1 {
  font-size: 1.5em;
  margin: 0;
}

.app-header .el-link {
  color: white;
  font-size: 1em;
}
.app-header .el-link:hover {
  color: #c6e2ff;
}

.app-main {
  flex-grow: 1;
  padding: 30px 20px;
  background-color: #f4f6f9; /* 淡灰色背景 */
}

.control-panel,
.results-panel {
  margin-bottom: 25px;
  border: 1px solid #e4e7ed;
  border-radius: 8px; /* 更圆润的边角 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
  font-weight: bold;
}

.summary-content {
  white-space: pre-wrap; /* 保留换行和空格 */
  line-height: 1.6;
}

.el-slider {
  padding: 0 10px; /* 给滑块组件一些呼吸空间 */
}

.app-footer {
  text-align: center;
  padding: 15px 0;
  color: #909399;
  font-size: 0.9em;
  background-color: #ffffff;
  border-top: 1px solid #e4e7ed;
}
</style>
