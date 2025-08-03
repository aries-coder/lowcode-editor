<script setup lang="ts">
import LowcodeEditor from '@/LowcodeEditor/index.vue'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'vue3-dnd'
</script>

<template>
  <div class="w-full h-full">
    <dnd-provider :backend="HTML5Backend">
      <lowcode-editor />
    </dnd-provider>
  </div>
</template>

<style scoped></style>
