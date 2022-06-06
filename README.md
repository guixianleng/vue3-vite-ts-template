# Vue 3 + Typescript + Vite + pinia + ant-design-vue

## Preparation

- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui basic use
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## 图标

### 组件库图标

使用 ant-design-vue 提供的图标

```vue
<template>
  <StarOutlined />
  <StarFilled />
  <StarTwoTone twoToneColor="#eb2f96" />
</template>

<script>
  import { defineComponent } from 'vue'
  import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons-vue'
  export default defineComponent({
    components: { StarOutlined, StarFilled, StarTwoTone },
  })
</script>
```

### Iconify 图标（推荐使用）

项目中使用到的是 [vite-plugin-purge-icons](https://github.com/antfu/purge-icons/blob/main/packages/vite-plugin-purge-icons/README.md) 这个插件来进行图标实现。

## Install and use

- Get the project code

```bash
git clone https://github.com/guixianleng/vue3-vite-ts-template.git
```

- Installation dependencies

```bash
yarn install
```

- run

```bash
yarn serve
```

- build

```bash
yarn build
```
