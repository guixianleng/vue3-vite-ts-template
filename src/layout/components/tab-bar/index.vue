<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <span
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              class="ant-tag ant-tag-checked"
              :class="{ 'link-actived': tag.fullPath === $route.fullPath }"
              @click="goto(tag)"
            >
              <span class="tag-link">{{ tag.title }}</span>
              <span
                class="ant-icon-hover ant-tag-icon-hover ant-icon-hover-size-medium ant-tag-close-btn"
                @click.stop="tagClose(tag, index)"
              >
                <Icon icon="ic:outline-close" size="14" />
              </span>
            </span>
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import type { RouteLocationNormalized } from 'vue-router'
  import { listenerRouteChange } from '/@/utils/route-listener'
  import { useAppStore, useTabBarStore } from '/@/store'
  import type { TagProps } from '/@/store/modules/tab-bar/types'

  import { Icon } from '/@/components/Icon'

  const appStore = useAppStore()
  const tabBarStore = useTabBarStore()

  const router = useRouter()
  const affixRef = ref()
  const tagList = computed(() => {
    return tabBarStore.getTabList
  })
  const offsetTop = computed(() => {
    return appStore.navbar ? 60 : 0
  })

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition()
    },
  )

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (!route.meta.noAffix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
      tabBarStore.updateTabList(route)
    }
  }, true)

  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag)
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1]
      router.push({ name: latest.name })
    }
  }

  const goto = (tag: TagProps) => {
    router.push({ ...tag })
  }
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: #fff;
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: #fff;
      border-bottom: 1px solid rgb(229, 230, 235);
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 42px;
          white-space: nowrap;
          overflow-x: auto;

          :deep(.ant-tag) {
            margin-right: 6px;
            height: 24px;
            font-size: 12px;
            line-height: 22px;
            background-color: rgb(242, 243, 245);
            padding: 2px 8px;
            cursor: pointer;
          }
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }

  .tag-link {
    color: #666;
    text-decoration: none;
    margin-right: 6px;
  }
  .link-actived {
    color: rgb(22, 93, 255);
    .tag-link {
      color: rgb(22, 93, 255);
    }
  }
  :deep(.a-affix) {
    z-index: 90;
    background-color: rgb(242, 243, 245);
    overflow-x: auto;
  }
</style>
