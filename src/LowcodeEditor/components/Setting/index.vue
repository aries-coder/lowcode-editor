<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { reactive } from 'vue'
import ComponentAttr from './ComponentAttr'
import ComponentEvent from './ComponentEvent/index.vue'
import ComponentStyle from './ComponentStyle'

defineOptions({
  name: 'SettingPanel'
})

const keys = reactive([
  {
    type: 'attr',
    label: '属性'
  },
  {
    type: 'style',
    label: '样式'
  },
  {
    type: 'event',
    label: '事件'
  }
])
</script>

<template>
  <div class="h-full overflow-auto">
    <n-tabs
      type="segment"
      animated
      class="h-full"
    >
      <template
        v-for="item in keys"
        :key="item.type"
      >
        <n-tab-pane
          :name="item.label"
          :tab="item.label"
        >
          <template v-if="item.type === 'attr'">
            <component-attr />
          </template>
          <template
            v-else-if="item.type === 'style'"
          >
            <component-style />
          </template>
          <template v-else>
            <component-event />
          </template>
        </n-tab-pane>
      </template>
    </n-tabs>
  </div>
</template>

<style scoped></style>
