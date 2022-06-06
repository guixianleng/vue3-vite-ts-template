<template>
  <LoginFormTitle v-show="getShow" />
  <a-form :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow" @keypress.enter="handleLogin">
    <a-form-item name="account">
      <a-input size="large" v-model:value="formData.account" placeholder="请输入账号" class="fix-auto-fill" />
    </a-form-item>
    <a-form-item name="password">
      <a-input-password size="large" visibilityToggle v-model:value="formData.password" placeholder="请输入密码" />
    </a-form-item>

    <a-row>
      <a-col :span="12">
        <a-form-item>
          <!-- No logic, you need to deal with it yourself -->
          <a-checkbox v-model:checked="rememberMe" size="small">记住密码</a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <a-button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            忘记密码？
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item>
      <a-button type="primary" size="large" block @click="handleLogin" :loading="loading">登录</a-button>
    </a-form-item>
    <a-button type="link" @click="setLoginState(LoginStateEnum.MOBILE)">使用手机号登录</a-button>

    <a-divider>其他登录方式</a-divider>

    <div class="flex justify-evenly" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>

    <div class="sub-title">
      <span>还没有账号？</span>
      <a-button type="link" @click="setLoginState(LoginStateEnum.REGISTER)">去注册</a-button>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'

  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue'
  import LoginFormTitle from './LoginFormTitle.vue'

  import useUserStore from '/@/store/modules/user'
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'

  const prefixCls = ref('vAdmin-login')
  const userStore = useUserStore()

  const { setLoginState, getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()
  const router = useRouter()

  const formRef = ref()
  const loading = ref(false)
  const rememberMe = ref(false)

  const formData = reactive({
    account: 'admin',
    password: '123456',
  })

  const { validForm } = useFormValid(formRef)

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    if (!data) return
    try {
      loading.value = true
      await userStore.login({
        password: data.password,
        username: data.account,
      })
      message.success({
        content: '登录成功',
        duration: 1,
        onClose: () => {
          const { redirect, ...othersQuery } = router.currentRoute.value.query
          router.push({
            name: (redirect as string) || 'Dashboard',
            query: {
              ...othersQuery,
            },
          })
        },
      })
      // 登录成功逻辑处理
    } catch (error) {
      // 登录失败
    } finally {
      loading.value = false
    }
  }
</script>
