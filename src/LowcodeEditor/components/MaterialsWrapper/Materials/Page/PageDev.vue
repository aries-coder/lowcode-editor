<script setup lang="ts">
defineOptions({ name: 'LowcodePageDev' })
import { useMaterialDrop } from '@/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'

const { id } = defineProps<CommonComponentProps>()

const { isHover, drop } = useMaterialDrop(
  ['Button', 'Container', 'Modal', 'Table'],
  id
)
</script>

<template>
  <div
    :data-component-id="id"
    class="p-6 h-full box-border"
    :style="{
      border: isHover ? '2px solid blue' : ''
    }"
    :ref="drop"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
