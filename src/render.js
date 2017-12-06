import {templateWithProps} from './template'
import {hashCode} from './hash-code'
import {store} from './store'
import {NAMESPACE, PROCESSOR, CREATE_COMPONENT} from './constants'

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
    this[PROCESSOR] = simpleProcessor
    this[CREATE_COMPONENT] = simpleCreateComponent
    this.processCSS = this.processCSS.bind(this)
    this.createComponent = this.createComponent.bind(this)
    this.use = this.use.bind(this)
  }

  use(plugin) {
    this[plugin.stiligita] = plugin
    return {use: this.use}
  }

  processCSS(key, content) {
    return this[PROCESSOR](key, content)
  }

  createComponent(strings, args, tag) {
    return this[CREATE_COMPONENT](strings, args, tag)
  }
}

export default new Renderer()
