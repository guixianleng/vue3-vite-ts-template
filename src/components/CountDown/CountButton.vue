<template>
  <a-button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </a-button>
</template>
<script lang="ts">
  import { PropType } from 'vue'
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue'
  import { useCountdown } from './useCountdown'
  import { isFunction } from '/@/utils/is'

  const props = {
    count: { type: Number, default: 60 },
    beforeStartFunc: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  }

  export default defineComponent({
    name: 'CountButton',
    props,
    setup(props) {
      const loading = ref(false)

      const { currentCount, isStart, start, reset } = useCountdown(props.count)

      const getButtonText = computed(() => {
        return !unref(isStart) ? '获取验证码' : `${unref(currentCount)}秒后重新获取`
      })

      watchEffect(() => {
        props.count === 0 && reset()
      })

      /**
       * @description: Judge whether there is an external function before execution, and decide whether to start after execution
       */
      async function handleStart() {
        const { beforeStartFunc } = props
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true
          try {
            const canStart = await beforeStartFunc()
            canStart && start()
          } finally {
            loading.value = false
          }
        } else {
          start()
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart }
    },
  })
</script>
