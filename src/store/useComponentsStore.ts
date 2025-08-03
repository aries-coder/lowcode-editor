import { defineStore } from 'pinia'
import { reactive } from 'vue'

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
            children: [
              {
                id: 333,
                name: 'Button',
                props: {
                  text: '草泥马mmmmmm'
                }
              }
            ]
          }
        ]
      }
    ])

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

    function getComponenById(
      id: number,
      components: Component[]
    ): Component | null {
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
      addComponent,
      deleteComponent,
      updateComponent
    }
  }
)
