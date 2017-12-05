import React, {createElement, Component} from 'react'

import omit from 'lodash.omit'
import domElements, {htmlAttributes, starAttributes} from './dom-elements'
import Store from './store'
import {hashCode as hash, uuid, shortid, scopedName} from './hashing'
import {cleanObject, filterObject, notListener} from './_'
import {createStyleBlock, createCSS} from './css'


// add literals for all DOM elements
const styled = new Store()

domElements.forEach(domElement => {
  styled[domElement] = (..._) => createComponent(_, {domElement})
})

const getInvalidProperties = props => {
  const elementAttributes = htmlAttributes[props.domElement] || []
  const validAttributes = [...starAttributes, ...elementAttributes, 'children']
  return  Object.keys(props).filter(_ => validAttributes.indexOf(_) < 0 && notListener(_))
}

const Stiligita = props => createElement(props.domElement, {...omit(props, getInvalidProperties(props)), className: props.className})

const createComponent = (args, {domElement}) => {
  const [strings] = args
  args.shift()
  let id = uuid()
  return (props = {}) => {
    const css = createCSS(strings, args, props)
    const className = scopedName(id, JSON.stringify(filterObject(omit(props, ['children']))))
    styled.__STYLES__[className] = css.replace(/\s+/g, ' ')
    if (!styled.STYLE_TAG.innerHTML.match(`.${className}{`)) {
      styled.STYLE_TAG.innerHTML = createStyleBlock(styled.__STYLES__, styled.__KEYFRAMES__)
    }
    return <Stiligita {...props} className={className} domElement={domElement}/>
  }
}

export const Keyframes = (...args ) => {
  const [strings] = args
  args.shift()
  const id = scopedName()
  styled.__KEYFRAMES__[id] = strings.join('')
  return id
}

export default styled
