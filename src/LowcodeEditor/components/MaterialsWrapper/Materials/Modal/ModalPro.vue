<script setup lang="ts">
import { NModal } from 'naive-ui'
import { ref, type CSSProperties } from 'vue'

const {
  title,
  style,
  positiveText = '确认',
  negativeText = '取消',
  onCancel,
  onOk
} = defineProps<{
  title?: string
  style?: CSSProperties
  positiveText?: string
  negativeText?: string
  onCancel?: () => void
  onOk?: () => void
}>()

const isShow = ref<boolean>(false)

const open = () => (isShow.value = true)
const close = () => (isShow.value = false)

defineExpose({
  open,
  close
})
</script>

<template>
  <n-modal
    preset="dialog"
    :title
    :style
    :positive-text
    :negative-text
    :mask-closable="false"
    :show="isShow"
    @positive-click="
      () => {
        onOk ? onOk() : (isShow = false)
      }
    "
    @negative-click="
      () => {
        onCancel ? onCancel : (isShow = false)
      }
    "
    @close="
      () => {
        onCancel ? onCancel : (isShow = false)
      }
    "
  >
    <slot></slot>
  </n-modal>
</template>

<style scoped></style>
