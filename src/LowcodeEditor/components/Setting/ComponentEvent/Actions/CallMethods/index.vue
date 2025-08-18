<script setup lang="ts">
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import { NTreeSelect, NSelect } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'

interface Config {
  componentId: number
  method: string
}

const { onChange, defaultValue } = defineProps<{
  onChange: (config: Record<string, any>) => void
  defaultValue: Record<string, any>
}>()

const componentsStore = useComponentsStore()
const componentsConfigStore =
  useComponentsConfigStore()
const { components } = storeToRefs(
  componentsStore
)
const { componentsConfig } = storeToRefs(
  componentsConfigStore
)

const selectOptions =
  ref<Array<{ label: string; value: string }>>()
const config = reactive<Config>({} as Config)

function handleTreeSelectUpdate(id: number) {
  const curSelectedComponent =
    componentsStore.getComponenById(
      id,
      components.value
    )!

  selectOptions.value = componentsConfig.value[
    curSelectedComponent.name
  ].methods?.map(item => ({
    label: item.label,
    value: item.name
  }))

  config.componentId = id
}

watch(
  config,
  newVal => {
    onChange({
      type: 'callMethods',
      config: newVal
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="h-full flex flex-wrap items-center">
    <div class="w-full flex items-center px-2">
      <div class="min-w-[50px]">组件：</div>
      <n-tree-select
        :options="components"
        label-field="name"
        key-field="id"
        @update-value="handleTreeSelectUpdate"
        :default-value="defaultValue.id"
      />
    </div>
    <div class="w-full flex items-center px-2">
      <div class="min-w-[50px]">方法：</div>
      <n-select
        :options="selectOptions"
        @update-value="
          (method: string) =>
            (config.method = method)
        "
        :default-value="defaultValue.method"
      />
    </div>
  </div>
</template>

<style scoped></style>
