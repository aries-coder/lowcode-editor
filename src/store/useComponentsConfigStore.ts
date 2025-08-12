import { defineStore } from 'pinia'
import {
  markRaw,
  reactive,
  type Component
} from 'vue'
import Container from '@/LowcodeEditor/components/Materials/Container/index.vue'
import Button from '@/LowcodeEditor/components/Materials/Button/index.vue'
import Page from '@/LowcodeEditor/components/Materials/Page/index.vue'

export interface ComponentSetter {
  name: string
  type: string
  label: string
  [key: string]: unknown
}
export interface ComponentConfig {
  name: string
  defaultProps: Record<string, unknown>
  component: Component
  setters?: ComponentSetter[]
  stylesSetters?: ComponentSetter[]
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
          setters: [
            {
              name: 'type',
              label: '按钮类型',
              type: 'select',
              options: [
                {
                  label: '主按钮',
                  value: 'primary'
                },
                {
                  label: '默认按钮',
                  value: 'default'
                },
                {
                  label: '错误按钮',
                  value: 'error'
                }
              ]
            },
            {
              name: 'text',
              label: '文本',
              type: 'input'
            }
          ],
          stylesSetters: [
            {
              name: 'width',
              label: '宽度',
              type: 'inputNumber'
            },
            {
              name: 'height',
              label: '高度',
              type: 'inputNumber'
            }
          ],
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
