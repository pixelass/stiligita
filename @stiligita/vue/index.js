import Vue from 'vue'
import {cleanObject} from '@stiligita/utils'
import hashCode from '@stiligita/hash-code'
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'

function createElement(tag, {css, hash, displayName}) {
  return Vue.component(displayName, {
    render(createElement) {
      return createElement(tag, {
        attrs: {
          [`data-${NAMESPACE}`]: hash
        }
      }, this.$slots.default)
    }
  })
}

const createComponent = (strings, args, tag) => {
  const displayName = `styled-${tag}`
  const css = templateWithProps(strings, args)
  const hash = hashCode(css)
  store.addRules({[hash]: css})
  return createElement(tag, {css, hash, displayName})
}

createComponent.stiligita = CREATE_COMPONENT

export default createComponent
