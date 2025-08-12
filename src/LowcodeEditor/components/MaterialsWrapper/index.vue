<script setup lang="ts">
import Outline from './Outline/index.vue'
import Materials from './Materials/index.vue'
import Source from './Source/index.vue'
import { NTabs, NTabPane } from 'naive-ui'
</script>

<template>
  <div class="h-full">
    <n-tabs
      type="segment"
      animated
      class="h-full"
    >
      <n-tab-pane name="chap1" tab="物料">
        <Materials />
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="大纲">
        <Outline />
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="源码">
        <Source />
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
