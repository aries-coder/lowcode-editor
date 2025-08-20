<script setup lang="ts">
import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, ref } from 'vue'
import HoverMask from './HoverMask/index.vue'
import SelectMask from './SelectMask/index.vue'

const componentsStore = useComponentsStore()
const componentsConfigStore =
  useComponentsConfigStore()

const { componentsConfig } = storeToRefs(
  componentsConfigStore
)
const { components, currentComponentId } =
  storeToRefs(componentsStore)

const hoverComponentId = ref<number | null>(null)

function renderComponents(
  components: Component[]
): ReturnType<typeof h>[] {
  return components.map(component => {
    const config =
      componentsConfig.value[component.name]

    if (!config.dev) return h('div')

    const children =
      component.children?.length ?
        {
          default: () =>
            renderComponents(component.children!)
        }
      : undefined

    return h(
      config.dev,
      {
        id: component.id,
        name: component.name,
        styles: component.styles || {},
        ...config.defaultProps,
        ...component.props
      },
      children
    )
  })
}

function handleMouseOver(event: MouseEvent) {
  const target = (
    event.target as HTMLElement
  ).closest('[data-component-id]')

  if (target) {
    const componentId = target.getAttribute(
      'data-component-id'
    )
    if (componentId) {
      hoverComponentId.value = Number(componentId)
    }
  }
}
function handleMouseClick(event: MouseEvent) {
  const target = (
    event.target as HTMLElement
  ).closest('[data-component-id]')

  if (target) {
    const componentId = target.getAttribute(
      'data-component-id'
    )
    if (componentId) {
      componentsStore.setCurrentComponentId(
        Number(componentId)
      )
    }
  }
}
</script>

<template>
  <div
    class="h-full edit-are relative"
    @mouseover="handleMouseOver"
    @mouseleave="() => (hoverComponentId = null)"
    @click="handleMouseClick"
  >
    <component
      :is="{
        render: () => renderComponents(components)
      }"
    ></component>

    <template
      v-if="
        hoverComponentId &&
        hoverComponentId !== currentComponentId
      "
    >
      <hover-mask
        :id="hoverComponentId"
        containerClassName="edit-are"
      />
    </template>
    <template v-if="currentComponentId">
      <select-mask
        :id="currentComponentId"
        containerClassName="edit-are"
      />
    </template>
  </div>
</template>

<style scoped></style>
