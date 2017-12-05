import React, {createElement} from 'react'
import domElements, {htmlAttributes} from './dom-elements'
import Store from './store'
import {hashCode} from './hash-code'
import {cleanObject, isListener, isTruthy} from './_'
import {createCSS, createKeyframes} from './css'
import {NAMESPACE} from './constants'

const styled = new Store()

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => createComponent(strings, args, tag)
})

const getInvalidProperties = props => {
  const elementAttributes = htmlAttributes[props.tag] || []
  const validAttributes = [...htmlAttributes['*'], ...elementAttributes, 'children']
  return Object.keys(props)
    // keep anything that is invalid
    .filter(prop => validAttributes.indexOf(prop) < 0 && !isListener(prop))
    // remove data and aria attributes
    .filter(prop => isTruthy(prop.substring(0, 5),['data-', 'aria-']))
}

const Stiligita = props => createElement(props.tag, {...cleanObject(props, getInvalidProperties(props)), [`data-${NAMESPACE}`]: props.stiligitaId})

const createComponent = (strings, args, tag) => props => {
    const css = createCSS(strings, args, props)
    const className = hashCode(css)
    styled.addStyles({[className]: css})
    return <Stiligita {...props} stiligitaId={className} tag={tag}/>
  }

export const Keyframes = (strings, ...args) => {
  const css = createKeyframes(strings, args)
  const id = hashCode(css)
  styled.addKeyframes({[id]: css})
  return id
}

export default styled
