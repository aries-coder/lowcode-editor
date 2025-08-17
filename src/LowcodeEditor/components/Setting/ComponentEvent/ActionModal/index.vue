<script setup lang="ts">
import { NModal, NTabs, NTabPane } from 'naive-ui'
import GoToLink from '../Actions/GoToLink/index.vue'
import ShowMessage from '../Actions/ShowMessage/index.vue'
import { ref } from 'vue'
import CustomJS from '../Actions/CustomJS/index.vue'

const {
  isShow,
  handleShowModal,
  action,
  handleOk
} = defineProps<{
  isShow: boolean
  handleShowModal: (key: boolean) => void
  handleOk: (action: Record<string, any>) => void
  action: Record<string, any>
}>()

const curConfig = ref<Record<string, any>>({})

function handleOnChange(
  config: Record<string, any>
) {
  curConfig.value = config
}
</script>

<template>
  <n-modal
    :mask-closable="false"
    :show="isShow"
    preset="dialog"
    content="你确认"
    title="事件配置动作"
    positive-text="确认"
    negative-text="算了"
    @close="handleShowModal(false)"
    @positive-click="handleOk(curConfig)"
    @negative-click="handleShowModal(false)"
  >
    <n-tabs
      type="segment"
      animated
      :default-value="action.type || 'goToLink'"
      class="h-[300px]"
    >
      <n-tab-pane name="goToLink" tab="访问链接">
        <go-to-link
          @change="handleOnChange"
          :default-value="
            action.type === 'goToLink' ?
              action.url
            : ''
          "
        />
      </n-tab-pane>
      <n-tab-pane
        name="showMessage"
        tab="消息提示"
      >
        <show-message
          @change="handleOnChange"
          :default-value="
            action.type === 'showMessage' ?
              action.config
            : {}
          "
        />
      </n-tab-pane>
      <n-tab-pane name="customJS" tab="自定义js">
        <CustomJS
          :code="
            action.type === 'customJS' ?
              action.code
            : ''
          "
          @change="handleOnChange"
        />
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<style scoped></style>
