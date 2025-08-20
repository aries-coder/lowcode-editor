<script setup lang="ts">
import type { CommonComponentProps } from '@/LowcodeEditor/interface'
import {
  NButton,
  type ButtonProps as NButtonProps
} from 'naive-ui'
import { defineOptions, defineProps } from 'vue'
import { useDrag } from 'vue3-dnd'

interface ButtonProps {
  text: string
  type: NButtonProps['type']
}

defineOptions({
  name: 'LowcodeButtonDev'
})

const { text, type, id, styles } = defineProps<
  ButtonProps & CommonComponentProps
>()

const [, drag] = useDrag(() => ({
  type: 'Button',
  item: {
    type: 'Button',
    dragType: 'move',
    id
  }
}))
</script>

<template>
  <span :ref="drag">
    <NButton
      :data-component-id="id"
      :type="type"
      :style="styles"
      >{{ text }}</NButton
    >
  </span>
</template>

<style scoped></style>
