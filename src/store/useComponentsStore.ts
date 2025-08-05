import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export interface Component {
  id: number
  name: string
  props?: Record<string, unknown>
  children?: Component[]
  parentId?: number
}

export const useComponentsStore = defineStore(
  'components',
  () => {
    const components = reactive<Component[]>([
      {
        id: 111,
        name: 'Page',
        props: {},
        children: [
          {
            id: 222,
            name: 'Container',
            parentId: 111,
            children: [
              {
                id: 333,
                name: 'Button',
                props: {
                  text: '草泥马mmmmmm'
                },
                parentId: 222
              }
            ]
          }
        ]
      }
    ])
    const currentComponentId = ref<number | null>(
      null
    )
    const currentComponent =
      ref<Component | null>(null)

    const addComponent = (
      compontnt: Component,
      parentId: number
    ) => {
      const parentComponent = getComponenById(
        parentId,
        components
      )
      if (parentComponent) {
        if (parentComponent.children) {
          parentComponent.children.push(compontnt)
        } else {
          parentComponent.children = [compontnt]
        }
      }
      compontnt.parentId = parentId
    }

    const deleteComponent = (id: number) => {
      const component = getComponenById(
        id,
        components
      )

      if (component?.parentId) {
        const parentComponent = getComponenById(
          component.parentId,
          components
        )

        if (
          parentComponent &&
          parentComponent.children
        ) {
          parentComponent.children =
            parentComponent.children.filter(
              child => child.id !== id
            )
        }
      }
    }

    const updateComponent = (
      props: Component['props'],
      id: number
    ) => {
      const component = getComponenById(
        id,
        components
      )
      if (component) {
        component.props = {
          ...component.props,
          ...props
        }
      }
    }

    const setCurrentComponentId = (
      id: number | null
    ) => {
      currentComponentId.value = id
      currentComponent.value = getComponenById(
        id,
        components
      )
    }

    function getComponenById(
      id: number | null,
      components: Component[]
    ): Component | null {
      if (!id) return null
      for (const component of components) {
        if (component.id === id) return component
        if (
          component.children &&
          component.children.length > 0
        ) {
          const found = getComponenById(
            id,
            component.children
          )

          if (found) return found
        }
      }

      return null
    }

    return {
      components,
      currentComponent,
      currentComponentId,
      setCurrentComponentId,
      addComponent,
      deleteComponent,
      updateComponent,
      getComponenById
    }
  }
)
