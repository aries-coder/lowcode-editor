<script setup lang="ts">
import { useDrag } from 'vue3-dnd'

defineOptions({
  name: 'MaterialsItem'
})
const { name, desc } = defineProps<{
  name: string,
  desc: string
}>()

const [, drag] = useDrag(() => ({
  type: name,
  item: {
    type: name
  }
}))
</script>

<template>
  <div
    :ref="drag"
    class="border-1 border-dashed p-3 m-2 cursor-move select-none"
  >
    {{ desc }}
  </div>
</template>

<style scoped></style>
