<script setup lang="ts">
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

const props = defineProps<ButtonProps>()
</script>

<template>
  <NButton :type="type">{{ props.text }}</NButton>
</template>

<style scoped></style>
