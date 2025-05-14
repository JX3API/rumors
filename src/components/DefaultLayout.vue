<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <el-main class="layoutMain">
      <slot />
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.layoutMain {
  padding: 0;
}
</style>
