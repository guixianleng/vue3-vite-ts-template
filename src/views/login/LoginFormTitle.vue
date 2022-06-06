<template>
  <h2 class="title">
    {{ getFormTitle }}
  </h2>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'

  const { getLoginState } = useLoginState()

  const getFormTitle = computed(() => {
    const titleObj = {
      [LoginStateEnum.RESET_PASSWORD]: '重置密码',
      [LoginStateEnum.LOGIN]: '登录',
      [LoginStateEnum.REGISTER]: '注册',
      [LoginStateEnum.MOBILE]: '手机登录',
      [LoginStateEnum.QR_CODE]: '二维码登录',
    }
    return titleObj[unref(getLoginState)]
  })
</script>

<style lang="less" scoped>
  .title {
    font-size: 24px;
    line-height: 44px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
  }
</style>
