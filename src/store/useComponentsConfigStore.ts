import { defineStore } from 'pinia'
import {
  markRaw,
  reactive,
  type Component
} from 'vue'

import ContainerDev from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Container/ContainerDev.vue'
import ButtonDev from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Button/ButtonDev.vue'
import PageDev from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Page/PageDev.vue'
import ModalDev from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Modal/ModalDev.vue'

import ContainerPro from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Container/ContainerPro.vue'
import ButtonPro from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Button/ButtonPro.vue'
import PagePro from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Page/PagePro.vue'
import ModalPro from '@/LowcodeEditor/components/MaterialsWrapper/Materials/Modal/ModalPro.vue'

export interface ComponentSetter {
  name: string
  type: string
  label: string
  [key: string]: unknown
}
export interface ComponentEvent {
  label: string
  name: string
}
export type ComponenMethod = ComponentEvent
export interface ComponentConfig {
  name: string
  defaultProps: Record<string, unknown>
  dev: Component
  pro: Component
  setters?: ComponentSetter[]
  stylesSetters?: ComponentSetter[]
  desc: string
  events?: ComponentEvent[]
  methods?: ComponenMethod[]
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
          dev: markRaw(PageDev),
          pro: markRaw(PagePro),
          desc: '页面'
        },
        Container: {
          name: 'Container',
          defaultProps: {},
          dev: markRaw(ContainerDev),
          pro: markRaw(ContainerPro),
          desc: '容器'
        },
        Button: {
          name: 'Button',
          defaultProps: {
            type: 'primary',
            text: '按钮'
          },
          dev: markRaw(ButtonDev),
          pro: markRaw(ButtonPro),
          desc: '按钮',
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
          events: [
            {
              name: 'onClick',
              label: '点击事件'
            },
            {
              name: 'ondblclick',
              label: '双击事件'
            }
          ]
        },
        Modal: {
          name: 'Modal',
          defaultProps: {},
          dev: markRaw(ModalDev),
          pro: markRaw(ModalPro),
          desc: '模态框',
          setters: [
            {
              name: 'title',
              label: '标题',
              type: 'input'
            },
            {
              name: 'positiveText',
              label: '确认按钮文本',
              type: 'input'
            },
            {
              name: 'negativeText',
              label: '取消按钮文本',
              type: 'input'
            }
          ],
          methods: [
            {
              name: 'open',
              label: '打开弹窗'
            },
            {
              name: 'close',
              label: '关闭弹窗'
            }
          ]
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
