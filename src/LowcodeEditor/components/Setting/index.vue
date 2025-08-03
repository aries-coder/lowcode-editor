<script setup lang="ts">
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'SettingPanel'
})
const store = useComponentsStore()
const { components } = storeToRefs(store)
</script>

<template>
  <div class="h-full overflow-auto">
    <pre>
      {{ JSON.stringify(components, null, 2) }}
    </pre>
  </div>
</template>

<style scoped></style>
