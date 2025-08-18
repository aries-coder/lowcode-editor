<script setup lang="ts">
defineOptions({ name: 'LowcodeContainer' })

import { useMaterialDrop } from '@/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'

const { id, styles } =
  defineProps<CommonComponentProps>()

const { isHover, drop } = useMaterialDrop(
  ['Button', 'Container', 'Modal'],
  id
)
</script>

<template>
  <div
    :data-component-id="id"
    :ref="drop"
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
