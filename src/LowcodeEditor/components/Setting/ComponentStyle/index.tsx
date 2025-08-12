import {
  defineComponent,
  reactive,
  ref,
  watch,
  type CSSProperties
} from 'vue'
import { useComponentsStore } from '@/store/useComponentsStore'
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import {
  useComponentsConfigStore,
  type ComponentSetter
} from '@/store/useComponentsConfigStore'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import CSSEditor from './CSSEditor/index.vue'
import { debounce } from 'lodash-es'
import {
  cssToJsObject,
  objectToCss,
  stripPx
} from '@/utils'

export default defineComponent({
  name: 'ComponentStyle',
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
    const css = ref<string>('')

    function onFieldChange(
      field: string,
      value: unknown
    ) {
      formModel[field] = stripPx({
        [field]: value
      })[field]
      componentsStore.updateComponentStyles(
        { [field]: value } as CSSProperties,
        currentComponentId.value!
      )
    }

    function renderFormElement(
      setter: ComponentSetter
    ) {
      const { type, options, name } = setter
      const value = formModel[name]

      switch (type) {
        case 'input':
          return (
            <NInput
              value={value}
              onInput={v =>
                onFieldChange(name, v)
              }
            />
          )
        case 'select':
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
        case 'inputNumber':
          return (
            <NInputNumber
              value={
                typeof value === 'number' ? value
                : null
              }
              onUpdate:value={v => {
                if (!v)
                  return onFieldChange(
                    name,
                    '0px'
                  )
                onFieldChange(name, v + 'px')
              }}
            />
          )
        default:
          break
      }
    }

    const handleEditorChange = debounce(
      (value: string) => {
        css.value = value
        const cssObject = cssToJsObject(
          value
        ) as CSSProperties

        componentsStore.updateComponentStyles(
          cssObject,
          currentComponentId.value!,
          true
        )
      },
      500
    )

    watch(
      currentComponent,
      () => {
        css.value = objectToCss(
          '.com',
          currentComponent.value?.styles || {}
        )
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 切换选中组件 -> 回填表单
    watch(
      () => currentComponent.value,
      newVal => {
        Object.keys(formModel).forEach(
          item => delete formModel[item]
        )

        if (newVal) {
          const styles = stripPx(
            newVal.styles || {}
          )
          Object.assign(formModel, {
            ...styles
          })
        }
      },
      { immediate: true }
    )

    return () => {
      if (!currentComponent.value) return null

      return (
        <div class="p-1 h-full">
          <NForm
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            model={formModel}
          >
            {componentsConfig.value[
              currentComponent.value!.name
            ].stylesSetters?.map(setter => {
              return (
                <NFormItem label={setter.label}>
                  {renderFormElement(setter)}
                </NFormItem>
              )
            })}
          </NForm>
          <CSSEditor
            value={css.value}
            onChange={handleEditorChange}
          />
        </div>
      )
    }
  }
})
