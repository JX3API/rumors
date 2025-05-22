# 阿瓦达啃大瓜

阿瓦达啃大瓜 (Avaada Kedavra) 是一个使用 Vue.js 和 Element Plus 构建的 Web 应用，旨在帮助用户快速理解和总结在线讨论或帖子（例如百度贴吧）的主要内容。用户可以输入帖子ID或链接，应用将通过 API 获取信息并生成包括标题、摘要、关键词、涉及人物、帖子类型和主要内容的总结。

## 功能特性 (Features)

- **帖子总结**: 根据用户提供的帖子ID或链接，调用API生成内容摘要。
- **只看楼主**: 可选择只分析楼主发布的内容。
- **AI参数调整**: 用户可以调整如最大输出字符数 (Max Output Tokens) 和随机性 (Temperature) 等参数，以控制总结的详细程度和创造性。
- **结构化输出**: 展示包含标题、一句话总结、关键词、主要人物、帖子分类和详细内容的结构化总结。
- **复制结果**: 一键复制生成的总结内容到剪贴板。
- **API文档**: 提供指向后端API文档的便捷链接。

## 技术栈 (Technology Stack)

- **Vue.js**: 用于构建用户界面的渐进式 JavaScript 框架。
- **Element Plus**: 一套基于 Vue 3 的桌面端 UI 组件库。
- **Vite**: 下一代前端开发与构建工具，提供快速的冷启动和即时热模块替换（HMR）。
- **Axios**: 一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。
- **pnpm**: 快速的、节省磁盘空间的内容可寻址包管理器。

## 快速开始 (Getting Started)

### 先决条件 (Prerequisites)

- Node.js (推荐最新 LTS 版本)
- pnpm (请参照官方文档安装：[https://pnpm.io/installation](https://pnpm.io/installation))

### 安装与运行 (Installation and Running)

1.  **克隆仓库 (Clone the repository):**
    ```bash
    git clone https://github.com/your-username/awdkdg.git  # 请替换为实际的仓库地址
    cd awdkdg
    ```

2.  **安装依赖 (Install dependencies):**
    ```bash
    pnpm install
    ```

3.  **配置环境变量 (Configure environment variables):**
    项目需要一个 API 基础地址。请在项目根目录下创建一个 `.env.development` 文件，并添加以下内容：
    ```env
    VITE_APP_BASEAPI=你的API基础地址
    ```
    例如: `VITE_APP_BASEAPI=https://api.example.com`
    这个地址是后端总结服务的入口点。

4.  **运行开发服务器 (Run the development server):**
    ```bash
    pnpm dev
    ```
    应用将在本地启动，通常地址为 `http://localhost:5173` (具体端口请查看 Vite 启动时的输出)。

## 可用脚本 (Available Scripts)

在项目目录中，你可以运行以下脚本：

-   `pnpm dev`:
    在开发模式下运行应用。打开 [http://localhost:5173](http://localhost:5173) (或Vite指定的其他端口) 在浏览器中查看。
    页面将在你修改代码后自动重新加载。

-   `pnpm build`:
    将应用构建到 `dist` 文件夹中用于生产环境。
    它会优化构建，使其具有最佳性能。

-   `pnpm preview`:
    在本地启动一个静态服务器，用于预览生产构建 (`dist` 文件夹) 的效果。

-   `pnpm lint`:
    运行配置好的代码检查工具 (ESLint, OXLint)。

-   `pnpm lint:oxlint`:
    单独运行 OXLint 进行代码检查和自动修复。

-   `pnpm lint:eslint`:
    单独运行 ESLint 进行代码检查和自动修复。

-   `pnpm format`:
    使用 Prettier 格式化项目中的 `src/` 目录下的代码。

-   `pnpm deploy`:
    构建项目并将 `dist` 目录的内容部署到 GitHub Pages。

## 项目结构 (Project Structure)

```
awdkdg/
├── public/             # 静态资源，会被直接复制到构建输出目录
├── src/                # 项目源代码
│   ├── assets/         # 静态资源 (如 CSS, 图像)，会被 Vite 处理
│   ├── components/     # Vue 组件
│   ├── router/         # Vue Router 路由配置
│   ├── views/          # 路由对应的视图组件
│   ├── App.vue         # 根 Vue 组件
│   └── main.js         # 应用入口文件
├── .env                # 默认环境变量 (如果存在)
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── .eslintrc.json      # ESLint 配置文件 (或 .js, .cjs)
├── .gitignore          # Git 忽略文件配置
├── .prettierrc.json    # Prettier 配置文件
├── index.html          # HTML 入口文件
├── package.json        # 项目元数据和依赖项
├── pnpm-lock.yaml      # pnpm 锁文件
└── vite.config.js      # Vite 配置文件
```

-   **`public/`**: 包含不会被 Webpack 或 Vite 处理的静态资源。它们会被直接复制到最终的构建输出目录中。
-   **`src/`**: 项目的核心代码。
    -   **`assets/`**: 存放如全局 CSS、字体文件或图片等资源，这些资源会被 Vite 构建系统处理和优化。
    -   **`components/`**: 存放可复用的 Vue 组件。例如，布局组件 `DefaultLayout.vue`。
    -   **`router/`**: 包含 Vue Router 的配置 (`index.js`)，定义了应用的路由规则。
    -   **`views/`**: 存放与特定路由绑定的视图级组件。例如，`InformationMain.vue` 作为首页视图。
    -   **`App.vue`**: 应用的根组件。
    -   **`main.js`**: 应用的入口点，负责初始化 Vue 实例、路由、全局插件等。
-   **`.env.*`**: 环境变量文件，用于不同环境（开发、生产）的配置。
-   **`index.html`**: 单页应用的 HTML 主入口文件。
-   **`vite.config.js`**: Vite 的配置文件。

## 贡献指南 (Contributing)

欢迎对此项目做出贡献！如果你有任何改进建议或功能想法，请遵循以下步骤：

1.  **Fork 本仓库 (Fork the Project)**
2.  **创建你的特性分支 (Create your Feature Branch):**
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **提交你的更改 (Commit your Changes):**
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
    请确保在提交前运行代码检查和格式化工具：
    ```bash
    pnpm lint
    pnpm format
    ```
4.  **推送到分支 (Push to the Branch):**
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **打开一个拉取请求 (Open a Pull Request)**

我们感谢你的贡献！
