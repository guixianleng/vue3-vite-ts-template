<template>
  <a-breadcrumb class="td-breadcrumb">
    <a-breadcrumbItem v-for="item in crumbs" :key="item.to" :to="item.to">
      {{ item.title }}
    </a-breadcrumbItem>
  </a-breadcrumb>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const crumbs = computed(() => {
    const route = useRoute()
    const pathArray = route.path.split('/')
    pathArray.shift()
    const breadcrumbs = pathArray.reduce((breadcrumbArray: any[], path: string, idx: number) => {
      breadcrumbArray.push({
        path,
        to: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${path}` : `/${path}`,
        title: route.matched[idx].meta.title || path,
      })
      return breadcrumbArray
    }, [])
    return breadcrumbs
  })
</script>
<style scoped>
  .td-breadcrumb {
    padding: 15px 20px;
  }
</style>
