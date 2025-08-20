<script setup lang="ts">
defineOptions({ name: 'LowcodeContainer' })

import { useMaterialDrop } from '@/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'
import { useDrag } from 'vue3-dnd'

const { id, styles } =
  defineProps<CommonComponentProps>()

const { isHover, drop } = useMaterialDrop(
  ['Button', 'Container', 'Modal', 'Table'],
  id
)

const [, drag] = useDrag(() => ({
  type: 'Container',
  item: {
    type: 'Container',
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
    <slot></slot>
  </div>
</template>

<style scoped></style>
