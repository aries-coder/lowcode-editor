import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'EditAre',
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
        console.log(component.name)

        const config =
          componentsConfig.value[component.name]

        if (!config.component) return h('div')

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
          config.component,
          {
            id: component.id,
            name: component.name,
            ...config.defaultProps,
            ...component.props
          },
          children
        )
      })
    }

    return () =>
      renderComponents(components.value)
  }
})
