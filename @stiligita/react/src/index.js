import {createElement} from 'react'
import {render} from '@stiligita/dom'
import {cleanObject} from '@stiligita/utils'
import hashCode from '@stiligita/hash-code'
import {CREATE_COMPONENT, CREATE_SELECTOR} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'
import getInvalid from './get-invalid-attributes'

export const Element = props =>
  createElement(props.tag, {
    ...cleanObject(props, getInvalid(props)),
    ...render[CREATE_SELECTOR](props.hash, 'html')
  })
Element.displayName = 'Stiligita'

const createReactComponent = (strings, args, tag, defaultProps) => {
  const Component = props => {
    props = {...defaultProps, ...props}
    const css = render.preProcessCSS(templateWithProps(strings, args, props))
    const hash = hashCode(css)
    store.addRules({[hash]: css})
    const hashes = [store.getName(hash)]
    // The tag might be a component with previously applied classNames or
    // data-attributes
    // We need to make sure they are not overwritten
    if (props[render[CREATE_SELECTOR][CREATE_SELECTOR]]) {
      hashes.push(props[render[CREATE_SELECTOR][CREATE_SELECTOR]])
    }
    return createElement(Element, {...props, tag, hash: hashes.join(' ')}, props.children)
  }
  Component.displayName = `styled-${tag}`
  return Component
}

createReactComponent.stiligita = CREATE_COMPONENT

export default createReactComponent
