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

  processCSS(key, content) {
    return this[PROCESSOR](key, content)
  }

  createComponent(strings, args, tag) {
    return this[CREATE_COMPONENT](strings, args, tag)
  }
}

export default new Renderer()
