<script setup lang="ts">
defineOptions({
  name: 'ComponentEvent'
})

import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import {
  NCollapse,
  NCollapseItem,
  NSelect
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import GoToLink from './GoToLink/index.vue'
import ShowMessage from './ShowMessage/index.vue'

const componentsConfigStore =
  useComponentsConfigStore()
const componentsStore = useComponentsStore()
const { componentsConfig } = storeToRefs(
  componentsConfigStore
)
const { currentComponent, currentComponentId } =
  storeToRefs(componentsStore)

const selectOptions = [
  {
    label: '跳转链接',
    value: 'goToLink'
  },
  {
    label: '显示信息',
    value: 'showMessage'
  }
]

function handleUpdateSelectValue(
  eventName: string,
  type: string
) {
  componentsStore.updateComponentProps(
    {
      [eventName]: () => ({ type })
    },
    currentComponentId.value!
  )
}

const getSelectValue = (propName: string) => {
  const prop =
    currentComponent.value?.props?.[propName]
  return typeof prop === 'function' ? prop() : (
      null
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
          <div class="flex items-center px-2">
            <div class="min-w-[50px]">动作：</div>
            <n-select
              :options="selectOptions"
              :value="
                getSelectValue(item.name)?.type
              "
              @update-value="
                (type: string) =>
                  handleUpdateSelectValue(
                    item.name,
                    type
                  )
              "
            />
          </div>
          <template
            v-if="
              getSelectValue(item.name)?.type ===
              'goToLink'
            "
          >
            <go-to-link v-bind="item" />
          </template>
          <template
            v-if="
              getSelectValue(item.name)?.type ===
              'showMessage'
            "
          >
            <show-message v-bind="item" />
          </template>
          <div>{{  }}</div>
        </n-collapse-item>
      </template>
    </n-collapse>
  </div>
</template>

<style scoped></style>
