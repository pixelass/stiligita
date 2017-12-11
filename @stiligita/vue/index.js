import Vue from 'vue'
import {cleanObject} from '@stiligita/utils'
import hashCode from '@stiligita/hash-code'
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'


const createComponent = (strings, args, tag, defaultProps = {}) => {
  const displayName = `styled-${tag}`
  return Vue.component(displayName, {
    props: Object.keys(defaultProps),
    render(createElement) {
      const {propsData = {}} = this.$vnode.componentOptions
      const css = templateWithProps(strings, args, propsData)
      const hash = hashCode(css)
      store.addRules({[hash]: css})
      return createElement(tag, {
        attrs: {
          ...propsData,
          [`data-${NAMESPACE}`]: hash
        }
      }, this.$slots.default)
    }
  })
}

createComponent.stiligita = CREATE_COMPONENT

export default createComponent
