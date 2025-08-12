<script setup lang="ts">
defineOptions({
  name: 'HoverMask'
})

import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

interface HoverMaskProps {
  id: number
  containerClassName: string
}
const { id, containerClassName } =
  defineProps<HoverMaskProps>()
const position = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  labelLeft: 0,
  labelTop: 0
})
const componentStore = useComponentsStore()
const { components } = storeToRefs(componentStore)
const currentComponent = computed(() =>
  componentStore.getComponenById(
    id,
    components.value
  )
)

function updatePosition() {
  if (!id) return

  const currentHoverEl = document.querySelector(
    `[data-component-id="${id}"]`
  ) as HTMLElement
  const containerEl = document.querySelector(
    `.${containerClassName}`
  ) as HTMLElement
  if (!currentHoverEl || !containerEl) return

  const { width, height, left, top } =
    currentHoverEl.getBoundingClientRect()
  const {
    left: containerLeft,
    top: containerTop
  } = containerEl.getBoundingClientRect()

  let labelTop =
    top - containerTop + containerEl.scrollTop
  if (labelTop <= 0) {
    labelTop += 22
  }

  position.value = {
    width,
    height,
    left:
      left -
      containerLeft +
      containerEl.scrollLeft,
    top:
      top - containerTop + containerEl.scrollTop,
    labelLeft: left - containerLeft + width,
    labelTop
  }
}

watch(
  () => id,
  () => {
    updatePosition()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div
    :style="{
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
      width: position.width + 'px',
      height: position.height + 'px',
      position: 'absolute',
      left: position.left + 'px',
      top: position.top + 'px',
      pointerEvents: 'none',
      zIndex: 12
    }"
  ></div>
  <div
    :style="{
      position: 'absolute',
      left: position.labelLeft + 'px',
      top: position.labelTop + 'px',
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      color: '#fff',
      padding: '0 8px',
      borderRadius: '4px',
      transform: 'transLate(-100%, -100%)',
      zIndex: 13,
      whiteSpace: 'nowrap'
    }"
  >
    {{ currentComponent?.name }}
  </div>
</template>

<style scoped></style>
