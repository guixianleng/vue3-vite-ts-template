<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <a-form :model="formData" :rules="getFormRules" ref="formRef">
      <a-form-item name="account">
        <a-input class="fix-auto-fill" size="large" v-model:value="formData.account" placeholder="账号" />
      </a-form-item>
      <a-form-item name="mobile">
        <a-input size="large" v-model:value="formData.mobile" placeholder="手机号码" class="fix-auto-fill" />
      </a-form-item>
      <a-form-item name="sms">
        <CountdownInput size="large" class="fix-auto-fill" v-model:value="formData.sms" placeholder="短信验证码" />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password size="large" v-model:value="formData.password" placeholder="密码" />
      </a-form-item>
      <a-form-item name="confirmPassword">
        <a-input-password
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          placeholder="确认密码"
        />
      </a-form-item>

      <a-form-item name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <a-checkbox v-model:checked="formData.policy" size="small"> 我同意xxx隐私政策 </a-checkbox>
      </a-form-item>

      <a-space direction="vertical" style="width: 100%">
        <a-button type="primary" size="large" block @click="handleRegister" :loading="loading">注册</a-button>
        <a-button size="large" block @click="handleBackLogin"> 返回 </a-button>
      </a-space>
    </a-form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import CountdownInput from '/@/components/CountDown/CountdownInput.vue'
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'

  const { handleBackLogin, getLoginState } = useLoginState()

  const formRef = ref()
  const loading = ref(false)

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    sms: '',
    policy: false,
  })

  const { getFormRules } = useFormRules(formData)
  const { validForm } = useFormValid(formRef)

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

  async function handleRegister() {
    const data = await validForm()
    if (!data) return
    console.log(data)
  }
</script>
