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

  const [collect, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) return

      const defaultProps =
        componentsConfig.value[item.type]
          .defaultProps || {}
      componentsStore.addComponent(
        {
          id: Date.now(),
          name: item.type,
          props: defaultProps
        },
        id
      )
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
