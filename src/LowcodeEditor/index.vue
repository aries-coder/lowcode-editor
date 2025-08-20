<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import MaterialsWrapper from './components/MaterialsWrapper/index.vue'
import EditAre from './components/EditAre/index.vue'
import Setting from './components/Setting/index.vue'
import EditorHeader from './components/Header/index.vue'
import Preview from './components/Preview/'
import { emitter } from '@/utils'
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import {
  NMessageProvider,
  NConfigProvider
} from 'naive-ui'

const componentsStore = useComponentsStore()
const { mode } = storeToRefs(componentsStore)

defineOptions({
  name: 'LowcodeEditorIndex'
})

function handleSplipanesResized() {
  emitter.emit('pane-resized')
}
</script>

<template>
  <div class="h-full">
    <EditorHeader />
    <template v-if="mode === 'dev'">
      <Splitpanes
        class="default-theme"
        @resized="handleSplipanesResized"
      >
        <Pane
          min-size="20"
          max-size="30"
          size="25"
        >
          <MaterialsWrapper />
        </Pane>
        <Pane>
          <n-config-provider class="h-full">
            <EditAre />
          </n-config-provider>
        </Pane>
        <Pane
          min-size="25"
          max-size="30"
          size="25"
        >
          <Setting />
        </Pane>
      </Splitpanes>
    </template>
    <template v-else>
      <n-config-provider class="h-full">
        <n-message-provider>
          <Preview />
        </n-message-provider>
      </n-config-provider>
    </template>
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
