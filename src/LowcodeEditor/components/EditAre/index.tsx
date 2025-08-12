import {
  useComponentsStore,
  type Component
} from '@/store/useComponentsStore'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { storeToRefs } from 'pinia'
import { h, defineComponent, ref } from 'vue'
import HoverMask from './HoverMask/index.vue'
import SelectMask from './SelectMask/index.vue'

export default defineComponent({
  name: 'EditAre',
  setup() {
    const componentsStore = useComponentsStore()
    const componentsConfigStore =
      useComponentsConfigStore()

    const { componentsConfig } = storeToRefs(
      componentsConfigStore
    )
    const { components, currentComponentId } =
      storeToRefs(componentsStore)

    const hoverComponentId = ref<number | null>(
      null
    )

    function renderComponents(
      components: Component[]
    ): ReturnType<typeof h>[] {
      return components.map(component => {
        const config =
          componentsConfig.value[component.name]

        if (!config.dev) return h('div')

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
          config.dev,
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

    function handleMouseOver(event: MouseEvent) {
      const target = (
        event.target as HTMLElement
      ).closest('[data-component-id]')

      if (target) {
        const componentId = target.getAttribute(
          'data-component-id'
        )
        if (componentId) {
          hoverComponentId.value =
            Number(componentId)
        }
      }
    }
    function handleMouseClick(event: MouseEvent) {
      const target = (
        event.target as HTMLElement
      ).closest('[data-component-id]')

      if (target) {
        const componentId = target.getAttribute(
          'data-component-id'
        )
        if (componentId) {
          componentsStore.setCurrentComponentId(
            Number(componentId)
          )
        }
      }
    }

    return () => (
      <div
        class="h-full edit-are relative"
        onMouseover={handleMouseOver}
        onMouseleave={() =>
          (hoverComponentId.value = null)
        }
        onClick={handleMouseClick}
      >
        {renderComponents(components.value)}
        {hoverComponentId.value &&
          hoverComponentId.value !==
            currentComponentId.value && (
            <HoverMask
              id={hoverComponentId.value}
              containerClassName="edit-are"
            />
          )}
        {currentComponentId.value && (
          <SelectMask
            id={currentComponentId.value}
            containerClassName="edit-are"
          />
        )}
      </div>
    )
  }
})
