<script setup lang="ts">
import {
  NTabs,
  NTabPane,
  NModalProvider
} from 'naive-ui'
import ComponentAttr from './ComponentAttr'
import ComponentEvent from './ComponentEvent/index.vue'
import ComponentStyle from './ComponentStyle'

defineOptions({
  name: 'SettingPanel'
})
</script>

<template>
  <div class="h-full overflow-auto">
    <n-tabs
      type="segment"
      animated
      class="h-full"
    >
      <n-tab-pane name="chap1" tab="属性">
        <ComponentAttr />
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="样式">
        <ComponentStyle />
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="事件">
        <n-modal-provider>
          <ComponentEvent />
        </n-modal-provider>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style>
.n-tabs-pane-wrapper,
.n-tab-pane {
  height: 100%;
}
</style>
