<template>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <NavBar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          collapsible
          :width="menuWidth"
          collapsed-width="50"
          :theme="menuTheme"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :trigger="null"
          @collapse="setCollapsed"
        >
          <Menu />
          <menu-unfold-outlined @click="setCollapsed(!collapsed)" class="trigger-collapse" />
        </a-layout-sider>
        <a-layout class="layout-content" :style="paddingStyle">
          <TabBar v-if="appStore.tabBar" />
          <a-layout-content>
            <Breadcrumb :items="breadcrumbList" v-if="showBreadcrumb" />
            <PageLayout />
          </a-layout-content>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAppStore, useUserStore } from '/@/store'
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue'

  import PageLayout from './page-layout.vue'
  import NavBar from './components/navbar/index.vue'
  import Menu from './components/menu/index.vue'
  import Footer from './components/footer/index.vue'
  import TabBar from './components/tab-bar/index.vue'
  import Breadcrumb from './components/breadcrumb/index.vue'

  import usePermission from '/@/hooks/permission'
  import useResponsive from '/@/hooks/responsive'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const permission = usePermission()
  useResponsive(true)

  const navbarHeight = `60px`
  // 页面布局配置
  const navbar = computed(() => appStore.navbar)
  const renderMenu = computed(() => appStore.menu)
  const hideMenu = computed(() => appStore.hideMenu)
  const footer = computed(() => appStore.footer)
  const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth
  })
  const menuTheme = computed(() => {
    return appStore.theme
  })
  const collapsed = computed(() => {
    return appStore.menuCollapse
  })
  const showBreadcrumb = computed(() => {
    return appStore.breadcrumb
  })

  const paddingStyle = computed(() => {
    const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {}
    const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {}
    return { ...paddingLeft, ...paddingTop }
  })

  const setCollapsed = (val: boolean) => {
    appStore.updateSettings({ menuCollapse: val })
  }
  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route)) router.push({ name: 'notFound' })
    },
  )
  const breadcrumbList = ref<string[]>([])
</script>

<style scoped lang="less">
  @nav-size-height: 60px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    background-color: #fff;
    .trigger-collapse {
      position: absolute;
      right: 12px;
      bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .layout-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>
