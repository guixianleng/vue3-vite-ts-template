<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="content">
      <LoginForm />
      <ForgetPasswordForm />
      <RegisterForm />
      <MobileForm />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import Footer from '/@/layout/components/footer/index.vue'
  import LoginForm from './LoginForm.vue'
  import MobileForm from './MobileForm.vue'
  import ForgetPasswordForm from './ForgetPasswordForm.vue'
  import RegisterForm from './RegisterForm.vue'

  const prefixCls = ref('vAdmin-login')
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';

  .@{prefix-cls} {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-position: 100%;
    position: relative;
    width: 100%;

    background-color: white;
    background-image: url('/@/assets/assets-login-bg-white.png');

    .content {
      position: absolute;
      top: 22%;
      left: 5%;
      min-height: 500px;
      line-height: 22px;
      width: 400px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
    }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
