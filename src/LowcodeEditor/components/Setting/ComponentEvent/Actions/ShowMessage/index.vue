<script setup lang="ts">
import { NSelect, NInput } from 'naive-ui'
import { watch } from 'vue'
import { reactive } from 'vue'

interface Config {
  type: 'success' | 'error' | 'warning'
  text: string
}

const { onChange, defaultValue } = defineProps<{
  onChange: (config: Record<string, any>) => void
  defaultValue: Record<string, any>
}>()
const config = reactive<Record<string, any>>({})

const selectOptions = [
  {
    label: '成功',
    value: 'success'
  },
  {
    label: '失败',
    value: 'error'
  },
  {
    label: '警告',
    value: 'warning'
  }
]

watch(config, newVal => {
  onChange({
    type: 'showMessage',
    config: newVal
  })
})
</script>

<template>
  <div class="h-full flex flex-wrap items-center">
    <div class="w-full flex items-center px-2">
      <div class="min-w-[50px]">类型：</div>
      <n-select
        :options="selectOptions"
        :default-value="defaultValue.type"
        @update-value="
          (type: Config['type']) =>
            (config.type = type)
        "
      />
    </div>
    <div class="flex items-center px-2 w-full">
      <div class="min-w-[50px]">文本：</div>
      <n-input
        :default-value="defaultValue.text"
        @input="
          (text: string) => (config.text = text)
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
