<script setup lang="ts">
import type { CommonComponentProps } from '@/LowcodeEditor/interface'
import {
  NButton,
  type ButtonProps as NButtonProps
} from 'naive-ui'
import { defineOptions, defineProps } from 'vue'

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
</script>

<template>
  <NButton
    :data-component-id="id"
    :type="type"
    :style="styles"
    >{{ text }}</NButton
  >
</template>

<style scoped></style>
