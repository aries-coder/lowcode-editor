<script setup lang="ts">
defineOptions({ name: 'LowcodePage' })
import { useMaterialDrop } from '@/LowcodeEditor/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'

const { id } = defineProps<CommonComponentProps>()

const { isHover, drop } = useMaterialDrop(
  ['Button', 'Container'],
  id
)
</script>

<template>
  <div
    class="p-5 h-full box-border"
    :style="{
      border: isHover ? '2px solid blue' : ''
    }"
    :ref="drop"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
