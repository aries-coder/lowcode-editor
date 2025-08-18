<script setup lang="ts">
defineOptions({
  name: 'ComponentEvent'
})

import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import {
  NCollapse,
  NCollapseItem,
  NButton
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import ActionModal from './ActionModal/index.vue'
import ShowEventCard from './ShowEventCard/index.vue'
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
const curAction = ref<Record<string, any>>({})
const curActionIndex = ref<number>()

function getEventsByEventName(eventName: string) {
  return (
    currentComponent.value?.events?.[eventName] ||
    []
  )
}

function handleShowModal(key: boolean) {
  isShow.value = key
}

function handleOkAction(
  action: Record<string, any>
) {
  handleShowModal(false)

  if (curAction.value.type) {
    console.log(action)
    componentsStore.updateComponentEvents(
      {
        [curEventName.value]:
          getEventsByEventName(
            curEventName.value
          ).map((eventAction, index) => {
            if (index === curActionIndex.value) {
              return action
            }
            return eventAction
          })
      },
      currentComponentId.value!
    )
  } else {
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

  curEventName.value = ''
}

function handleDelectAction(
  eventName: string,
  index: number
) {
  const curActions =
    getEventsByEventName(eventName)
  curActions.splice(index, 1)

  componentsStore.updateComponentEvents(
    {
      [eventName]: [...curActions]
    },
    currentComponentId.value!
  )
}

function handleEditAction(
  eventName: string,
  index: number
) {
  curEventName.value = eventName
  curActionIndex.value = index
  const curActions =
    getEventsByEventName(eventName)
  curAction.value = curActions[index]

  handleShowModal(true)
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
              v-for="(
                action, index
              ) in getEventsByEventName(
                item.name
              )"
              :key="`${action.type}-${index}`"
            >
              <show-event-card
                :action
                :index
                :event-name="item.name"
                :handle-delect-action
                :handle-edit-action
              />
            </template>
          </div>
          <template #header-extra>
            <n-button
              type="primary"
              @click="
                () => {
                  curAction = {}
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
      :action="curAction"
      :handle-show-modal="handleShowModal"
      :handle-ok="handleOkAction"
    />
  </div>
</template>

<style scoped></style>
