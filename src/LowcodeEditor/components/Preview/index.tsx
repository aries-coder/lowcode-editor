import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

type MessageMethod = keyof MessageApiInjection

export default defineComponent({
  name: 'Previes',
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

    function handleRenderEvent(
      component: Component
    ) {
      const eventProps: Record<string, Function> =
        {}
      componentsConfig.value[
        component.name
      ].events?.forEach(event => {
        const eventConfig =
          component.props?.[event.name]?.()

        if (!eventConfig) return

        switch (eventConfig.type) {
          case 'goToLink':
            eventProps[event.name] = () => {
              window.location.href =
                eventConfig.url
            }
            break
          case 'showMessage':
            eventProps[event.name] = () => {
              message[
                eventConfig.config
                  .type as MessageMethod
              ](eventConfig.config.text)
            }
            break
          default:
            break
        }
      })
      console.log(eventProps)

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
