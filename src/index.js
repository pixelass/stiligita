import React, {createElement, Component} from 'react'

import omit from 'lodash.omit'
import htmlElementAttributes from 'html-element-attributes'
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

class Stiligita extends Component {
  constructor(props) {
    super(props)
    this.state = {
      removeAttrs: []
    }
    this.cleanUp = this.cleanUp.bind(this)
  }
  componentWillReceiveProps(newProps) {
    this.cleanUp(newProps)
  }
  componentWillMount() {
    this.cleanUp(this.props)
  }
  cleanUp(props) {
    const elementAttributes = htmlAttributes[props.domElement] || []
    const validAttributes = [...starAttributes, ...elementAttributes, 'children']
    this.setState({
      removeAttrs: Object.keys(props).filter(_ => validAttributes.indexOf(_) < 0 && notListener(_))
    })
  }
  render(){
    const {removeAttrs} = this.state
    const props = omit(this.props, removeAttrs)
    return createElement(this.props.domElement, {...props, className: this.props.className})
  }
}

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
