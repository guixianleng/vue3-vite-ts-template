<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :value="defaultValue"
    @change="handleChange"
  />
  <a-switch v-else :checked="defaultValue" size="small" @change="handleChange" />
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: [String, Boolean, Number],
      default: '',
    },
  })
  const emit = defineEmits(['inputChange'])
  const handleChange = (value: unknown) => {
    emit('inputChange', {
      value,
      key: props.name,
    })
  }
</script>
