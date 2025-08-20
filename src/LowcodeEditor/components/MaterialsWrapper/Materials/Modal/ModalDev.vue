<script setup lang="ts">
import { useMaterialDrop } from '@/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'
import { useDrag } from 'vue3-dnd'

const { id } = defineProps<CommonComponentProps>()

const { isHover, drop } = useMaterialDrop(
  ['Button', 'Container'],
  id
)

const [, drag] = useDrag(() => ({
  type: 'Modal',
  item: {
    type: 'Modal',
    dragType: 'move',
    id
  }
}))
</script>

<template>
  <div
    :data-component-id="id"
    :ref="node => drag(drop(node as any))"
    class="min-h-[150px] p-6"
    :style="[
      styles,
      {
        border:
          isHover ?
            '2px solid blue'
          : '1px solid #000'
      }
    ]"
  >
    <div>弹窗</div>
    <slot></slot>
  </div>
</template>

<style scoped></style>
