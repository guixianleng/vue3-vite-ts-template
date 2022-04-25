<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <Icon icon="ri:apps-2-fill" />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import { Icon } from '/@/components/Icon'

  defineProps({
    items: {
      type: Array as PropType<string[]>,
      default() {
        return []
      },
    },
  })
</script>

<style scoped lang="less">
  .container-breadcrumb {
    margin: 16px 0;
  }
</style>
