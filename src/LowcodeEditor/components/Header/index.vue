<script setup lang="ts">
import { NButton } from 'naive-ui'

defineOptions({
  name: 'EditorHeader'
})
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
const componentsStore = useComponentsStore()
const { mode } = storeToRefs(componentsStore)
</script>

<template>
  <div
    class="h-[50px] border-b-1 flex justify-between items-center px-1"
  >
    <div>lowcode editor</div>
    <div>
      <template v-if="mode === 'dev'">
        <n-button
          @click="componentsStore.setMode('pro')"
          >预览</n-button
        >
      </template>
      <template v-else>
        <n-button
          @click="componentsStore.setMode('dev')"
          >退出预览</n-button
        >
      </template>
    </div>
  </div>
</template>

<style scoped></style>
