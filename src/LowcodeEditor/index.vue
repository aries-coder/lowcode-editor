<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Materials from './components/Materials/index.vue'
import EditAre from './components/EditAre'
import Setting from './components/Setting/index.vue'
import EditorHeader from './components/Header/index.vue'

defineOptions({
  name: 'LowcodeEditorIndex'
})
</script>

<template>
  <div class="h-full">
    <EditorHeader />
    <Splitpanes class="default-theme">
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
  </div>
</template>

<style>
.splitpanes {
  height: calc(100% - 50px);
}
.splitpanes__pane {
  background-color: #fff !important;
}

.splitpanes__splitter {
  background-color: #ccc !important;
  width: 4px !important;
}
</style>
