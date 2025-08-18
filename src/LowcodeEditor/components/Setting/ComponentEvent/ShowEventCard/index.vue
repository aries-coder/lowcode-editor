<script setup lang="ts">
import { NCard, NTag } from 'naive-ui'

interface IProps {
  action: Record<string, any>
  eventName: string
  index: number

  handleDelectAction: (
    eventName: string,
    index: number
  ) => void
  handleEditAction: (
    eventName: string,
    index: number
  ) => void
}

defineProps<IProps>()
</script>

<template>
  <n-card :title="`事件：${action.type}`">
    <template v-if="action.type === 'goToLink'">
      <div>目标链接：{{ action.url }}</div>
    </template>
    <template
      v-if="action.type === 'showMessage'"
    >
      <div>
        消息类型：{{ action.config.type }}
      </div>
      <div>
        消息内容：{{ action.config.text }}
      </div>
    </template>
    <template v-if="action.type === 'customJS'">
      <div>
        代码：{{ action.code }}
      </div>
    </template>
      <template v-if="action.type === 'callMethods'">
      <div>
        目标组件id：{{ action.config.componentId }}
      </div>
      <div>
        目标方法：{{ action.config.method }}
      </div>
    </template>
    <template #header-extra>
      <n-tag
        type="error"
        @click="
          handleDelectAction(eventName, index)
        "
      >
        删除
      </n-tag>
      &nbsp;
      <n-tag
        type="info"
        @click="
          handleEditAction(eventName, index)
        "
      >
        修改
      </n-tag>
    </template>
  </n-card>
</template>

<style scoped></style>
