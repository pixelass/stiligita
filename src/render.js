import {templateWithProps} from './template'
import {hashCode} from './hash-code'
import {store} from './store'
import {NAMESPACE} from './constants'

const simpleProcessor = (key, content) => key ? `${key}{${content}}` : content

const simpleCreateComponent = (strings, args, tag) => props => {
  const css = templateWithProps(strings, args, props)
  const className = hashCode(css)
  store.addRules({[className]: css})
  const element = document.createElement(tag)
  switch(typeof props.children) {
    case 'object':
      element.appendChild(props.children)
      break
    case 'string':
      element.appendChild(document.createTextNode(props.children))
      break
    case 'undefined':
      break
    default:
      throw new TypeError(`Cannot create children from ${typeof props.children}`)
  }
  element.setAttribute(`data-${NAMESPACE}`, className)
  return element
}

class Renderer {
  constructor() {
    this.__PROCESSOR__ = simpleProcessor
    this.__CREATE_COMPONENT__ = simpleCreateComponent
    this.processCSS = this.processCSS.bind(this)
    this.createComponent = this.createComponent.bind(this)
  }

  set processor(processor) {
    this.__PROCESSOR__ = processor
  }

  set componentFactory(createComponent) {
    this.__CREATE_COMPONENT__ = createComponent
  }

  processCSS(key, content) {
    return this.__PROCESSOR__(key, content)
  }

  createComponent(strings, args, tag) {
    return this.__CREATE_COMPONENT__(strings, args, tag)
  }
}

export default new Renderer()
