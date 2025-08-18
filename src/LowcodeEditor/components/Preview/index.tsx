import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, defineComponent, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

type MessageMethod = keyof MessageApiInjection

export default defineComponent({
  name: 'preview',
  setup() {
    const componentsStore = useComponentsStore()
    const componentsConfigStore =
      useComponentsConfigStore()

    const { componentsConfig } = storeToRefs(
      componentsConfigStore
    )
    const { components } = storeToRefs(
      componentsStore
    )

    const message = useMessage()
    const componentsRefs = reactive<
      Record<string, any>
    >({})

    function handleRenderEvent(
      component: Component
    ) {
      const eventProps: Record<string, Function> =
        {}

      componentsConfig.value[
        component.name
      ].events?.forEach(event => {
        const eventActions =
          component.events?.[event.name]

        if (!eventActions) return

        eventActions.forEach(action => {
          switch (action.type) {
            case 'goToLink':
              eventProps[event.name] = () => {
                window.location.href = action.url
              }
              break
            case 'showMessage':
              eventProps[event.name] = () => {
                message[
                  action.config
                    .type as MessageMethod
                ](action.config.text)
              }
              break
            case 'customJS':
              eventProps[event.name] = () => {
                const script = new Function(
                  'context',
                  action.code
                )

                script({
                  name: component.name,
                  props: component.props,
                  showMessage(content: string) {
                    message.success(content)
                  }
                })
              }
              break
            case 'callMethods':
              eventProps[event.name] = () => {
                componentsRefs[
                  action.config.componentId
                ][action.config.method]()
              }
              break
            default:
              break
          }
        })
      })

      return eventProps
    }

    function renderComponents(
      components: Component[]
    ): ReturnType<typeof h>[] {
      return components.map(component => {
        const config =
          componentsConfig.value[component.name]

        if (!config.pro) return h('div')

        const children =
          component.children?.length ?
            {
              default: () =>
                renderComponents(
                  component.children!
                )
            }
          : undefined

        return h(
          config.pro,
          {
            id: component.id,
            name: component.name,
            styles: component.styles || {},
            ref: (ref: Record<string, any>) => {
              componentsRefs[component.id] = ref
            },
            ...config.defaultProps,
            ...component.props,
            ...handleRenderEvent(component)
          },
          children
        )
      })
    }

    return () => (
      <div class="h-full">
        {renderComponents(components.value)}
      </div>
    )
  }
})
