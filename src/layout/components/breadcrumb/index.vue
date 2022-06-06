<template>
  <a-breadcrumb class="td-breadcrumb" :routes="crumbs">
    <template #itemRender="{ route, paths }">
      <span v-if="crumbs.indexOf(route) === crumbs.length - 1">
        {{ route.title }}
      </span>
      <router-link v-else :to="`${paths.length > 1 ? `${paths.join('/')}` : ''}`">
        {{ route.title }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const crumbs = computed(() => {
    const pathArray = route.path.split('/')
    pathArray.shift()
    const breadcrumbs = pathArray.reduce((breadcrumbArray: any[], path: string, idx: number) => {
      breadcrumbArray.push({
        path,
        to: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${path}` : `/${path}`,
        title: route.matched[idx + 1].meta.locale || path,
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
