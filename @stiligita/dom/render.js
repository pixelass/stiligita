import hashCode from '@stiligita/hash-code'
import {NAMESPACE, PROCESSOR, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'

const simpleProcessor = (key, content) => key ? `${key}{${content}}` : content
const simpleCreateComponent = (strings, args, tag) => props => {}

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

  processCSS(...args) {
    return this[PROCESSOR](...args)
  }

  createComponent(...args) {
    return this[CREATE_COMPONENT](...args)
  }
}

export default new Renderer()
