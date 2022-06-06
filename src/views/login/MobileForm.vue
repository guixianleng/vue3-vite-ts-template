<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <a-form :model="formData" :rules="getFormRules" ref="formRef">
      <a-form-item name="mobile">
        <a-input size="large" v-model:value="formData.mobile" placeholder="手机号码" class="fix-auto-fill" />
      </a-form-item>
      <a-form-item name="sms">
        <CountdownInput size="large" class="fix-auto-fill" v-model:value="formData.sms" placeholder="短信验证码" />
      </a-form-item>

      <a-form-item>
        <a-space direction="vertical" style="width: 100%">
          <a-button type="primary" size="large" block @click="handleLogin" :loading="loading"> 登录 </a-button>
          <a-button size="large" block @click="handleBackLogin">返回</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue'
  import CountdownInput from '/@/components/CountDown/CountdownInput.vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'

  const { handleBackLogin, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    mobile: '',
    sms: '',
  })

  const { validForm } = useFormValid(formRef)

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    console.log(data)
  }
</script>
