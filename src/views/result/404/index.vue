<template>
  <div class="container">
    <div class="content">
      <a-result status="404" title="404 Not Found" sub-title="抱歉，您访问的页面不存在" />
      <div class="operation-row">
        <a-button key="again" style="margin-right: 16px">重试</a-button>
        <a-button key="back" type="primary">返回</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: '404',
  }
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    height: calc(100% - 40px);
    :deep(.content) {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      border-radius: 4px;
    }
  }
</style>
