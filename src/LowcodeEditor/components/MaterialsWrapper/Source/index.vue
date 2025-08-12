<script setup lang="ts">
import { useComponentsStore } from '@/store/useComponentsStore'
import loader from '@monaco-editor/loader'
import { editor } from 'monaco-editor'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const componentsStore = useComponentsStore()
const { components } = storeToRefs(
  componentsStore
)

const editorRef = ref<HTMLElement>()
let editorInstance: editor.IStandaloneCodeEditor

onMounted(async () => {
  const monaco = await loader.init()

  editorInstance = monaco.editor.create(
    editorRef.value!,
    {
      value: JSON.stringify(
        components.value,
        null,
        2
      ),
      language: 'json',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    }
  )
})

watch(
  () => components.value,
  newVal => {
    editorInstance.setValue(JSON.stringify(newVal, null, 2))
  },
  {
    deep: true
  }
)
</script>

<template>
  <div ref="editorRef" class="h-full"></div>
</template>

<style scoped></style>
