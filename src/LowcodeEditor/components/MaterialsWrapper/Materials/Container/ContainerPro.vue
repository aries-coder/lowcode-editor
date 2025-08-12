<script setup lang="ts">
defineOptions({ name: 'LowcodeContainer' })

import type { CommonComponentProps } from '@/LowcodeEditor/interface'

const { styles } =
  defineProps<CommonComponentProps>()
</script>

<template>
  <div
    class="min-h-[150px] p-6"
    :style="[styles]"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
