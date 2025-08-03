import { defineStore } from 'pinia'
import {
  markRaw,
  reactive,
  type Component
} from 'vue'
import Container from '@/LowcodeEditor/components/Materials/Container/index.vue'
import Button from '@/LowcodeEditor/components/Materials/Button/index.vue'
import Page from '@/LowcodeEditor/components/Materials/Page/index.vue'

interface ComponentConfig {
  name: string
  defaultProps: Record<string, unknown>
  component: Component
}
type ComponentsConfig = {
  [key: string]: ComponentConfig
}

export const useComponentsConfigStore =
  defineStore('componentsConfig', () => {
    const componentsConfig =
      reactive<ComponentsConfig>({
        Page: {
          name: 'Page',
          defaultProps: {},
          component: markRaw(Page)
        },
        Container: {
          name: 'Container',
          defaultProps: {},
          component: markRaw(Container)
        },
        Button: {
          name: 'Button',
          defaultProps: {
            type: 'primary',
            text: '按钮'
          },
          component: markRaw(Button)
        }
      })

    const registerComponent = (
      name: string,
      config: ComponentConfig
    ) => {
      componentsConfig[name] = config
    }

    return {
      componentsConfig,
      registerComponent
    }
  })
