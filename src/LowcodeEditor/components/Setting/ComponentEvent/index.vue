<script setup lang="ts">
defineOptions({
  name: 'ComponentEvent'
})

import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import {
  NCollapse,
  NCollapseItem,
  NButton,
  NCard,
  NTag
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import ActionModal from './ActionModal/index.vue'
import { ref } from 'vue'

const componentsConfigStore =
  useComponentsConfigStore()
const componentsStore = useComponentsStore()
const { componentsConfig } = storeToRefs(
  componentsConfigStore
)
const { currentComponent, currentComponentId } =
  storeToRefs(componentsStore)

const isShow = ref<boolean>(false)
const curEventName = ref<string>('')

function getEventsByEventName(eventName: string) {
  return (
    currentComponent.value?.events?.[eventName] ||
    []
  )
}

function handleShowModal(key: boolean) {
  isShow.value = key
}

function handleAddAction(
  action: Record<string, any>
) {
  handleShowModal(false)

  componentsStore.updateComponentEvents(
    {
      [curEventName.value]: [
        ...getEventsByEventName(
          curEventName.value
        ),
        action
      ]
    },
    currentComponentId.value!
  )
}
</script>

<template>
  <div v-if="currentComponent">
    <n-collapse>
      <template
        v-for="item in componentsConfig[
          currentComponent.name
        ].events || []"
        :key="`${currentComponentId}-${item.name}`"
      >
        <n-collapse-item
          :title="item.label"
          :name="item.name"
        >
          <div
            v-if="
              !!getEventsByEventName(item.name)
            "
            class="px-2 [&>*]:my-3"
          >
            <template
              v-for="action in getEventsByEventName(
                item.name
              )"
              :key="action.type"
            >
              <n-card
                :title="`事件：${action.type}`"
              >
                <template
                  v-if="
                    action.type === 'goToLink'
                  "
                >
                  <div>
                    目标链接：{{ action.url }}
                  </div>
                </template>
                <template
                  v-if="
                    action.type === 'showMessage'
                  "
                >
                  <div>
                    消息类型：{{
                      action.config.type
                    }}
                  </div>
                  <div>
                    消息内容：{{
                      action.config.text
                    }}
                  </div>
                </template>
                <template #header-extra>
                  <n-tag type="error">
                    删除
                  </n-tag>
                  &nbsp;
                  <n-tag type="info">
                    修改
                  </n-tag>
                </template>
              </n-card>
            </template>
          </div>
          <template #header-extra>
            <n-button
              type="primary"
              @click="
                () => {
                  isShow = true
                  curEventName = item.name
                }
              "
              >添加事件</n-button
            >
          </template>
        </n-collapse-item>
      </template>
    </n-collapse>
    <action-modal
      :is-show="isShow"
      :handle-show-modal="handleShowModal"
      :handle-ok="handleAddAction"
    />
  </div>
</template>

<style scoped></style>
