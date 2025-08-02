<script setup lang="ts">
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const componentsStore = useComponentsStore()
const { components } = storeToRefs(
  componentsStore
)

onMounted(() => {
  setTimeout(() => {
    componentsStore.addComponent(
      {
        id: 222,
        name: 'Button',
        props: {},
        children: []
      },
      111
    )
  }, 3000)
  setTimeout(() => {
    componentsStore.addComponent(
      {
        id: 333,
        name: 'video',
        props: {},
        children: []
      },
      222
    )
  }, 5000)

  setTimeout(() => {
    componentsStore.deleteComponent(333)
  }, 8000)

  setTimeout(() => {
    componentsStore.updateComponent(
      {
        name: 'Button Updated',
        props: { type: 'primary' }
      },
      222
    )
  }, 12000)
})
</script>

<template>
  <div>
    <pre>
      {{ JSON.stringify(components, null, 2) }}
    </pre>
  </div>
</template>

<style scoped></style>
