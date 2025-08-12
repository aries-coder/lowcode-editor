<script setup lang="ts">
import loader from '@monaco-editor/loader'
import type { editor } from 'monaco-editor'
import { onMounted, shallowRef, watch } from 'vue'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const { value, onChange } =
  defineProps<EditorProps>()

const editorRef = shallowRef<HTMLElement>()
let editorInstance: editor.IStandaloneCodeEditor

onMounted(async () => {
  const monaco = await loader.init()
  editorInstance = monaco.editor.create(
    editorRef.value!,
    {
      value,
      language: 'css',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    }
  )

  editorInstance.onDidChangeModelContent(() =>
    onChange(editorInstance.getValue())
  )
})

watch(
  () => value,
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
