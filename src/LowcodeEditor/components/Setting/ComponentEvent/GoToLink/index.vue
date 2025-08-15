<script setup lang="ts">
import { computed } from 'vue'
import { type ComponentEvent } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import { NInput } from 'naive-ui'

const { name: eventName } =
  defineProps<ComponentEvent>()

const componentsStore = useComponentsStore()
const { currentComponentId, currentComponent } =
  storeToRefs(componentsStore)

const eventProps = computed(() =>
  currentComponent.value?.props?.[eventName]?.()
)

function handelInputChange(url: string) {
  const obj = {
    ...eventProps.value,
    url
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
  <div class="flex items-center px-2">
    <div class="min-w-[50px]">链接：</div>
    <n-input
      :value="eventProps?.url"
      @input="handelInputChange"
    />
  </div>
</template>

<style scoped></style>
