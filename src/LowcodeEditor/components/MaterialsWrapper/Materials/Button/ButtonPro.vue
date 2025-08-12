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
  name: 'LowcodeButtonPro'
})

const { text, type, styles } = defineProps<
  ButtonProps & CommonComponentProps
>()
</script>

<template>
  <NButton :type="type" :style="styles">{{
    text
  }}</NButton>
</template>

<style scoped></style>
