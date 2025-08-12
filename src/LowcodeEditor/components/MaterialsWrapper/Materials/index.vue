<script setup lang="ts">
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import MaterialsItem from './MaterialsItem.vue'

defineOptions({
  name: 'LowcodeMaterials'
})
const componentsConfigStore =
  useComponentsConfigStore()
const { componentsConfig } = storeToRefs(
  componentsConfigStore
)

const components = computed(() =>
  Object.values(componentsConfig.value)
)
</script>

<template>
  <div class="flex flex-wrap">
    <template
      v-for="item in components"
      :key="item.name"
    >
      <materials-item
        :name="item.name"
        :desc="item.desc"
      />
    </template>
  </div>
</template>

<style scoped></style>
