import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, defineComponent } from 'vue'

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
            ...component.props
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
