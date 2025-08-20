<script setup lang="ts">
import { useMaterialDrop } from '@/hooks/useMaterialDrop'
import type { CommonComponentProps } from '@/LowcodeEditor/interface'
import { NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { computed, h } from 'vue'
import { useSlots } from 'vue'
import { useDrag } from 'vue3-dnd'

const { id } = defineProps<
  CommonComponentProps & { url: string }
>()
const slots = useSlots()

const { isHover, drop } = useMaterialDrop(
  ['TableColumn'],
  id
)
const [, drag] = useDrag(() => ({
  type: 'Table',
  item: { type: 'Table', dragType: 'move', id }
}))

const columns = computed<DataTableColumns<any>>(
  () => {
    const slotNodes = slots.default?.() ?? [] // 这里在渲染期被访问
    return slotNodes.map(v => {
      const props = (v.props || {}) as Record<
        string,
        any
      >
      const { id: cid, title, dataIndex } = props
      return {
        key: dataIndex,
        title: () =>
          h(
            'div',
            { 'data-component-id': cid ?? id },
            title ?? dataIndex ?? ''
          )
      }
    })
  }
)
</script>

<template>
  <div
    :data-component-id="id"
    :ref="
      node => {
        drag(drop(node as any))
      }
    "
    :style="{
      border:
        isHover ?
          '2px solid blue'
        : '1px solid #000'
    }"
  >
    <n-data-table
      :bordered="false"
      :columns="columns"
    />
    <slot />
  </div>
</template>

<style scoped></style>
