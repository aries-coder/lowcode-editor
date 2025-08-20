<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'
import { useSlots } from 'vue'
import axios from 'axios'

const { url } = defineProps<{ url: string }>()
const slots = useSlots()

const columns = computed<DataTableColumns<any>>(
  () => {
    const slotNodes = slots.default?.() ?? [] // 这里在渲染期被访问
    return slotNodes.map(v => {
      const props = (v.props || {}) as Record<
        string,
        any
      >
      const { title, dataIndex } = props
      return {
        key: dataIndex,
        title: title
      }
    })
  }
)
const data = ref<Record<string, any>[]>()

onMounted(async () => {
  try {
    const res = await axios.get(url)

    data.value = res.data
  } catch (error) {}
})
</script>

<template>
  <div>
    <n-data-table
      :bordered="false"
      :columns="columns"
      :data="data"
    />
    <slot />
  </div>
</template>

<style scoped></style>
