<script setup lang="ts">
import { NInput } from 'naive-ui'

const { onChange } = defineProps<{
  onChange: (config: Record<string, any>) => void
}>()

function handelInputChange(url: string) {
  onChange({
    url,
    type: 'goToLink'
  })
}
</script>

<template>
  <div class="flex items-center px-2">
    <div class="min-w-[50px]">链接：</div>
    <n-input @input="handelInputChange" />
  </div>
</template>

<style scoped></style>
