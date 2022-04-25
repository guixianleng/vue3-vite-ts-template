<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">Arco Pro</a-typography-title>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleTheme">
            <template #icon>
              <Icon icon="ri:moon-fill" v-if="theme === 'dark'" />
              <Icon icon="ri:sun-fill" v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="消息通知">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setPopoverVisible">
                <template #icon>
                  <Icon icon="mi:notification" />
                </template>
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <!-- <message-box /> -->
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip content="页面配置">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
            <template #icon>
              <setting-outlined />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown :trigger="['click']">
          <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a-space @click="switchRoles">
                  <tag-outlined />
                  <span>切换角色</span>
                </a-space>
              </a-menu-item>
              <a-menu-item key="1">
                <a-space @click="handleLogout">
                  <logout-outlined />
                  <span>退出登录</span>
                </a-space>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { TagOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue'
  import { Icon } from '/@/components/Icon'
  import { useDark, useToggle } from '@vueuse/core'
  import { useAppStore, useUserStore } from '/@/store'
  import useUser from '/@/hooks/user'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const { logout } = useUser()
  const avatar = computed(() => {
    return userStore.avatar
  })
  const theme = computed(() => {
    return appStore.theme
  })
  const isDark = useDark({
    selector: 'body',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'data-theme',
    onChanged(dark: boolean) {
      // overridded default behavior
      appStore.toggleTheme(dark)
    },
  })
  const toggleTheme = useToggle(isDark)
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true })
  }
  const refBtn = ref()

  const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    refBtn.value.dispatchEvent(event)
  }
  const handleLogout = () => {
    logout()
  }
  const switchRoles = async () => {
    const res = await userStore.switchRoles()
    message.success(res as string)
  }
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid rgb(229, 230, 235);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .right-side {
    display: flex;
    align-items: center;
    padding-right: 20px;
    list-style: none;
    margin-bottom: 0;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }
    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>
