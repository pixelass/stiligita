import React, {createElement} from 'react'
import {hashCode} from './hash-code'
import {store} from './store'
import {cleanObject} from './_'
import {NAMESPACE, CREATE_COMPONENT} from './constants'
import {templateWithProps} from './template'
import getInvalid from './get-invalid-attributes'

export const Stiligita = (props) => createElement(props.tag, {...cleanObject(props, getInvalid(props)), [`data-${NAMESPACE}`]: props.sid})

const createComponent = (strings, args, tag) => {
  return  props => {
    const css = templateWithProps(strings, args, props)
    const className = hashCode(css)
    store.addRules({[className]: css})
    return <Stiligita {...props} sid={className} tag={tag}/>
  }
}

createComponent.stiligita = CREATE_COMPONENT
export default createComponent

