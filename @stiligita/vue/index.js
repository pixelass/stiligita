import Vue from 'vue'
import hashCode from '@stiligita/hash-code'
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'

const assignStyled = (strings, args, props) => {
  const css = templateWithProps(strings, args, props)
  const hash = hashCode(css)
  return {css, hash}
}

const createComponent = (strings, args, tag, defaultProps = {}) => {
  return ({
    props: {...defaultProps},
    render(h) {
      const {propsData = {}, listeners = {}} = this.$vnode.componentOptions
      const {css, hash} = assignStyled(strings, args, propsData)
      store.addRules({[hash]: css})
      return h(tag, {
        on: listeners,
        domProps: {
          ...propsData
        },
        attrs: {
          [`data-${NAMESPACE}`]: hash
        }
      }, this.$slots.default)
    }
  })
}

createComponent.stiligita = CREATE_COMPONENT

export default createComponent
