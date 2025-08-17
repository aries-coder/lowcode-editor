<script setup lang="ts">
import { NSelect, NInput } from 'naive-ui'
import { reactive } from 'vue'

interface Config {
  type: 'success' | 'error' | 'warning'
  text: string
}

const { onChange } = defineProps<{
  onChange: (config: Record<string, any>) => void
  defaultValue: Record<string, any>
}>()
const config = reactive<Record<string, any>>({})

function handleChangeAction() {
  onChange({
    type: 'showMessage',
    config
  })
}

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
</script>

<template>
  <div>
    <div class="flex items-center px-2">
      <div class="min-w-[50px]">类型：</div>
      <n-select
        :options="selectOptions"
        :default-value="defaultValue.type"
        @update-value="
          (type: Config['type']) => {
            config.type = type
            handleChangeAction()
          }
        "
      />
    </div>
    <div class="flex items-center px-2">
      <div class="min-w-[50px]">文本：</div>
      <n-input
        :default-value="defaultValue.text"
        @input="
          (text: string) => {
            config.text = text
            handleChangeAction()
          }
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
