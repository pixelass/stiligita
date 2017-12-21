import {createElement} from 'react'
import {cleanObject} from '@stiligita/utils'
import hashCode from '@stiligita/hash-code'
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'
import getInvalid from './get-invalid-attributes'

/**
 * Simple element creator for React.
 * Adds stiligita speciffic data to the component.
 *
 * @param {<type>} props The properties
 * @return {HTMLElment}
 */
export const Element = props =>
  createElement(props.tag, {
    ...cleanObject(props, getInvalid(props)),
    [`data-${NAMESPACE}`]: props.hash
  })
Element.displayName = 'Stiligita'

/**
 * Creates a react component.
 *
 * @param      {Array.<string>} strings The strings
 * @param      {Array.<string|function>} args The arguments
 * @param      {string} tag The tag
 * @param      {object} defaultProps The default properties
 * @return     {Element}
 */
const createReactComponent = (strings, args, tag, defaultProps) => {
  const Component = props => {
    props = {...defaultProps, ...props}
    const css = templateWithProps(strings, args, props)
    const hash = hashCode(css)
    store.addRules({[hash]: css})
    return createElement(Element, {...props, tag, hash}, props.children)
  }
  Component.displayName = `styled-${tag}`
  return Component
}

createReactComponent.stiligita = CREATE_COMPONENT

export default createReactComponent
