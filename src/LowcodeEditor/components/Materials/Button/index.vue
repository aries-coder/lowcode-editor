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
  name: 'LowcodeButton'
})

const { text, type, id } = defineProps<
  ButtonProps & CommonComponentProps
>()
</script>

<template>
  <NButton :data-component-id="id" :type="type">{{
    text
  }}</NButton>
</template>

<style scoped></style>
