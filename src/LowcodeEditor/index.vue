<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Materials from './components/Materials.vue'
import EditAre from './components/EditAre.vue'
import Setting from './components/Setting.vue'

defineOptions({
  name: 'LowcodeEditorIndex'
})
</script>

<template>
  <Splitpanes class="w-full h-full default-theme">
    <Pane min-size="20" max-size="30" size="25">
      <Materials />
    </Pane>
    <Pane>
      <EditAre />
    </Pane>
    <Pane min-size="25" max-size="30" size="25">
      <Setting />
    </Pane>
  </Splitpanes>
</template>

<style>
.splitpanes__pane {
  background-color: #fff !important;
}

.splitpanes__splitter {
  background-color: #ccc !important;
  width: 4px !important;
}
</style>
