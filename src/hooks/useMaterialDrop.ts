import { useDrop } from 'vue3-dnd'
import { useComponentsConfigStore } from '@/store/useComponentsConfigStore'
import { useComponentsStore } from '@/store/useComponentsStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function useMaterialDrop(
  accept: string[],
  id: number
) {
  const componentsStore = useComponentsStore()
  const componentsConfigStore =
    useComponentsConfigStore()
  const { componentsConfig } = storeToRefs(
    componentsConfigStore
  )
  const { components } = storeToRefs(
    componentsStore
  )

  const [collect, drop] = useDrop(() => ({
    accept,
    drop: (
      item: {
        type: string
        dragType?: 'move' | 'copy'
        id?: number
      },
      monitor
    ) => {
      const didDrop = monitor.didDrop()
      if (didDrop) return

      if (item.dragType === 'move') {
        const component =
          componentsStore.getComponenById(
            item.id!,
            components.value
          )

        componentsStore.deleteComponent(item.id!)
        componentsStore.addComponent(
          component!,
          id
        )
      } else {
        const config =
          componentsConfig.value[item.type]

        componentsStore.addComponent(
          {
            id: Date.now(),
            name: item.type,
            props: config.defaultProps,
            desc: config.desc
          },
          id
        )
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }))

  const isHover = computed(
    () => collect.value.isOver
  )

  return {
    drop,
    isHover
  }
}
