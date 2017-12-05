import React, {createElement} from 'react'

import domElements, {htmlAttributes, starAttributes} from './dom-elements'
import Store from './store'
import {hashCode} from './hash-code'
import {cleanObject, filterObject, isListener, minify} from './_'
import {createStyleBlock, createCSS} from './css'

const styled = new Store()

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => createComponent(strings, args, tag)
})

const getInvalidProperties = props => {
  const elementAttributes = htmlAttributes[props.tag] || []
  const validAttributes = [...starAttributes, ...elementAttributes, 'children']
  return Object.keys(props).filter(prop => validAttributes.indexOf(prop) < 0 && !isListener(prop))
}

const Stiligita = props => createElement(props.tag, {...cleanObject(props, getInvalidProperties(props)), className: props.className})

const createComponent = (strings, args, tag) => props => {
    const css = createCSS(strings, args, props)
    const className = hashCode(css)
    styled.__STYLES__[className] = css
    if (!styled.__STYLE_TAG__.innerHTML.match(`.${className}{`)) {
      styled.__STYLE_TAG__.innerHTML = createStyleBlock(styled.__STYLES__, styled.__KEYFRAMES__)
    }
    return <Stiligita {...props} className={className} tag={tag}/>
  }

export const Keyframes = strings => {
  const css = strings.join('')
  const id = hashCode(css)
  styled.__KEYFRAMES__[id] = css
  return id
}

export default styled
