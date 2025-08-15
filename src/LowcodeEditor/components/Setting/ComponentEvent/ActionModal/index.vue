<script setup lang="ts">
import { NModal, NTabs, NTabPane } from 'naive-ui'
import GoToLink from '../GoToLink/index.vue'
import ShowMessage from '../ShowMessage/index.vue'
import { ref } from 'vue'

const { isShow, handleShowModal } = defineProps<{
  isShow: boolean
  handleShowModal: (key: boolean) => void
  handleOk: (action: Record<string, any>) => void
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
    <n-tabs type="segment" animated>
      <n-tab-pane name="chap1" tab="访问链接">
        <go-to-link @change="handleOnChange" />
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="消息提示">
        <show-message @change="handleOnChange" />
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="自定义js">
        1
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<style scoped></style>
