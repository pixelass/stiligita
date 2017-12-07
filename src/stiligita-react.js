import {createElement} from 'react'
import {hashCode} from './hash-code'
import {store} from './store'
import {cleanObject} from './_'
import {NAMESPACE, CREATE_COMPONENT} from './constants'
import {templateWithProps} from './template'
import getInvalid from './get-invalid-react-attributes'

export const Element = (props) =>
  createElement(props.tag, {
    ...cleanObject(props, getInvalid(props)),
     [`data-${NAMESPACE}`]: props.hash
   })
Element.displayName = 'Stiligita'

const createComponent = (strings, args, tag) => {
  const Component = props => {
    const css = templateWithProps(strings, args, props)
    const hash = hashCode(css)
    store.addRules({[hash]: css})
    return createElement(Element, {...props, tag, hash}, props.children)
  }
  Component.displayName = `styled-${tag}`
  return Component
}

createComponent.stiligita = CREATE_COMPONENT

export default createComponent
