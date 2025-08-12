<script setup lang="ts">
defineOptions({
  name: 'SelectMask'
})

import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'
import { Delete16Regular } from '@vicons/fluent'
import {
  NIcon,
  NPopconfirm,
  NDropdown
} from 'naive-ui'
import { emitter } from '@/utils'
interface HoverMaskProps {
  id: number
  containerClassName: string
}
const { id, containerClassName } =
  defineProps<HoverMaskProps>()
const componentStore = useComponentsStore()
const { currentComponent, components } =
  storeToRefs(componentStore)

const position = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  labelLeft: 0,
  labelTop: 0
})
const parentConfig = computed(() => {
  const options = []
  let component = componentStore.getComponenById(
    id,
    components.value
  )
  while (component?.parentId) {
    const parentComponent =
      componentStore.getComponenById(
        component.parentId,
        components.value
      )
    if (parentComponent) {
      options.push({
        label: parentComponent.name,
        key: parentComponent.id
      })
    }
    component = parentComponent
  }

  return options
})

function handelDropdownSelect(key: number) {
  componentStore.setCurrentComponentId(key)
}
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
function handleDeleteComponent() {
  componentStore.deleteComponent(id)
  componentStore.setCurrentComponentId(null)
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
watch(
  components.value,
  () => {
    updatePosition()
  },
  {
    immediate: true,
    deep: true
  }
)
onMounted(() => {
  window.addEventListener(
    'resize',
    updatePosition
  )

  emitter.on('pane-resized', updatePosition)
})
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

      transform: 'transLate(-100%, -100%)',
      zIndex: 13,
      whiteSpace: 'nowrap',
      display: 'flex',
      userSelect: 'none'
    }"
  >
    <n-dropdown
      trigger="hover"
      :options="parentConfig"
      @select="handelDropdownSelect"
    >
      <div
        :style="{
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          color: '#fff',
          padding: '0 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }"
      >
        {{ currentComponent?.desc }}
      </div>
    </n-dropdown>
    <template
      v-if="currentComponent?.name !== 'Page'"
    >
      <n-popconfirm
        @positive-click="handleDeleteComponent"
      >
        <template #trigger>
          <div
            :style="{
              backgroundColor:
                'rgba(0, 0, 255, 0.5)',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 4px',
              cursor: 'pointer',
              marginLeft: '8px'
            }"
          >
            <n-icon size="16">
              <Delete16Regular />
            </n-icon>
          </div>
        </template>
        确定删除？
      </n-popconfirm>
    </template>
  </div>
</template>

<style scoped></style>
