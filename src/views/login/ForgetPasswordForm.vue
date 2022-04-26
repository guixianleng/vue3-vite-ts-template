<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <a-form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <a-form-item name="account" class="enter-x">
        <a-input size="large" v-model:value="formData.account" placeholder="账号" />
      </a-form-item>

      <a-form-item name="mobile" class="enter-x">
        <a-input size="large" v-model:value="formData.mobile" placeholder="手机号码" />
      </a-form-item>
      <a-form-item name="sms" class="enter-x">
        <CountdownInput size="large" v-model:value="formData.sms" placeholder="短信验证码" />
      </a-form-item>

      <a-form-item class="enter-x">
        <a-button type="primary" size="large" block @click="handleReset" :loading="loading">重置</a-button>
        <a-button size="large" block class="mt-4" @click="handleBackLogin"> 返回 </a-button>
      </a-form-item>
    </a-form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import CountdownInput from '/@/components/CountDown/CountdownInput.vue'
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin'

  const { handleBackLogin, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    account: '',
    mobile: '',
    sms: '',
  })

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

  async function handleReset() {
    const form = unref(formRef)
    if (!form) return
    await form.resetFields()
  }
</script>
