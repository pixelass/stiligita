import Vue from 'vue'
import {cleanObject} from '@stiligita/utils'
import hashCode from '@stiligita/hash-code'
import {getInvalidAttibutes} from '@stiligita/dom-elements'
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
    props: {...defaultProps, on: Object},
    render(h) {
      const {propsData = {}, listeners = {}} = this.$vnode.componentOptions
      const {css, hash} = assignStyled(strings, args, propsData)
      store.addRules({[hash]: css})
      return h(tag, {
        on: listeners,
        attrs: {
          ...cleanObject(propsData, getInvalidAttibutes({...propsData, tag})),
          [`data-${NAMESPACE}`]: hash
        }
      }, this.$slots.default)
    }
  })
}

createComponent.stiligita = CREATE_COMPONENT

export default createComponent
