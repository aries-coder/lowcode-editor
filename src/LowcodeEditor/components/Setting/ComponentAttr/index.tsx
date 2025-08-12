import {
  defineComponent,
  reactive,
  watch
} from 'vue'
import { useComponentsStore } from '@/store/useComponentsStore'
import {
  NForm,
  NFormItem,
  NInput,
  NSelect
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import {
  useComponentsConfigStore,
  type ComponentSetter
} from '@/store/useComponentsConfigStore'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

export default defineComponent({
  name: 'ComponentAttr',
  setup() {
    const componentsStore = useComponentsStore()
    const componentsConfigStore =
      useComponentsConfigStore()
    const {
      currentComponent,
      currentComponentId
    } = storeToRefs(componentsStore)
    const { componentsConfig } = storeToRefs(
      componentsConfigStore
    )

    const formModel = reactive<
      Record<string, any>
    >({})

    function onFieldChange(
      field: string,
      value: unknown
    ) {
      formModel[field] = value
      componentsStore.updateComponentProps(
        { [field]: value },
        currentComponentId.value!
      )
    }

    function renderFormElement(
      setter: ComponentSetter
    ) {
      const { type, options, name } = setter
      const value = formModel[name]

      if (type === 'input') {
        return (
          <NInput
            value={value}
            onInput={v => onFieldChange(name, v)}
          />
        )
      } else if (type === 'select') {
        return (
          <NSelect
            value={value}
            options={
              options as SelectMixedOption[]
            }
            onUpdate:value={v =>
              onFieldChange(name, v)
            }
          />
        )
      }
    }

    // 切换选中组件 -> 回填表单
    watch(
      () => currentComponent.value,
      newVal => {
        Object.keys(formModel).forEach(
          item => delete formModel[item]
        )

        if (newVal) {
          Object.assign(formModel, {
            ...componentsConfig.value[newVal.name]
              .defaultProps,
            ...newVal.props
          })
        }
      },
      { immediate: true }
    )

    return () => {
      if (!currentComponent.value) return null

      return (
        <div class="p-1">
          <NForm
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            model={formModel}
          >
            <NFormItem label="组件id">
              <NInput
                disabled
                value={
                  currentComponent.value?.id + ''
                }
              />
            </NFormItem>
            <NFormItem label="组件名称">
              <NInput
                disabled
                value={
                  currentComponent.value?.name
                }
              />
            </NFormItem>
            {componentsConfig.value[
              currentComponent.value!.name
            ].setters?.map(setter => {
              return (
                <NFormItem label={setter.label}>
                  {renderFormElement(setter)}
                </NFormItem>
              )
            })}
          </NForm>
        </div>
      )
    }
  }
})
