<template>
  <a-input v-bind="$attrs" :class="prefixCls" :size="size">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :beforeStartFunc="sendCodeApi" />
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import CountButton from './CountButton.vue'

  const props = {
    size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
    count: { type: Number, default: 60 },
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  }

  export default defineComponent({
    name: 'CountDownInput',
    components: { CountButton },
    inheritAttrs: false,
    props,
    setup(props, { emit }) {
      const prefixCls = ref('vAdmin-countdown-input')

      emit('input', props.count)

      return { prefixCls }
    },
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: none;

      button {
        font-size: 14px;
      }
    }
  }
</style>
