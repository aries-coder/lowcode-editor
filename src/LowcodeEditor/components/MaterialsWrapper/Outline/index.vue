<script setup lang="ts">
import { useComponentsStore } from '@/store/useComponentsStore'
import { NTree } from 'naive-ui'
import { storeToRefs } from 'pinia'
const componentsStore = useComponentsStore()
const { components } = storeToRefs(
  componentsStore
)

function handleTreeSelected(data: any) {
  componentsStore.setCurrentComponentId(data[0])
}
</script>

<template>
  <div>
    <n-tree
      block-line
      :data="components"
      key-field="id"
      label-field="desc"
      children-field="children"
      selectable
      @update-selected-keys="handleTreeSelected"
    />
  </div>
</template>

<style scoped></style>
