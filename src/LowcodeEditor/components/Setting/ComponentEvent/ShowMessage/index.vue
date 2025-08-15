<script setup lang="ts">
import { NSelect, NInput } from 'naive-ui'
import { type ComponentEvent } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { name: eventName } =
  defineProps<ComponentEvent>()
const componentsStore = useComponentsStore()
const { currentComponentId, currentComponent } =
  storeToRefs(componentsStore)

const eventProps = computed(
  () =>
    currentComponent.value?.props?.[
      eventName
    ]?.() || {}
)
const eventPropsConfig = computed(
  () =>
    currentComponent.value?.props?.[eventName]?.()
      ?.config || {}
)

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

function handleMessageType(type: string) {
  const obj = {
    ...eventProps.value,
    config: {
      ...eventPropsConfig.value,
      type
    }
  }
  componentsStore.updateComponentProps(
    {
      [eventName]: () => ({
        ...obj
      })
    },
    currentComponentId.value!
  )
}

function handleMessageText(text: string) {
  const obj = {
    ...eventProps.value,
    config: {
      ...eventPropsConfig.value,
      text
    }
  }
  componentsStore.updateComponentProps(
    {
      [eventName]: () => ({
        ...obj
      })
    },
    currentComponentId.value!
  )
}
</script>

<template>
  <div>
    <div class="flex items-center px-2">
      <div class="min-w-[50px]">类型：</div>
      <n-select
        :key="`${currentComponentId}-${eventName}`"
        :options="selectOptions"
        :value="eventPropsConfig?.type"
        @update-value="handleMessageType"
      />
    </div>
    <div class="flex items-center px-2">
      <div class="min-w-[50px]">文本：</div>
      <n-input
        :value="eventPropsConfig?.text"
        @input="handleMessageText"
      />
    </div>
  </div>
</template>

<style scoped></style>
