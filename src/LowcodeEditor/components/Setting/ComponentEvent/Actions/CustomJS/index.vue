<script setup lang="ts">
import loader from '@monaco-editor/loader'
import type { editor } from 'monaco-editor'
import { onMounted, shallowRef, watch } from 'vue'

const { code, onChange } = defineProps<{
  code: string,
  onChange: (config: Record<string, any>) => void
}>()

const editorRef = shallowRef<HTMLElement>()
let editorInstance: editor.IStandaloneCodeEditor

onMounted(async () => {
  const monaco = await loader.init()
  editorInstance = monaco.editor.create(
    editorRef.value!,
    {
      value: code,
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    }
  )

  editorInstance.onDidChangeModelContent(() =>
    onChange({
      type: 'customJS',
      code: editorInstance.getValue()
    })
  )
})

watch(
  () => code,
  newVal => {
    if (
      editorInstance &&
      editorInstance.getValue() !== newVal
    ) {
      editorInstance.setValue(newVal)
    }
  }
)
</script>

<template>
  <div ref="editorRef" class="h-full"></div>
</template>

<style scoped></style>
