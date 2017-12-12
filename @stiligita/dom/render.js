import {PROCESSOR, CREATE_COMPONENT} from '@stiligita/constants'

/**
 * A simple CSS processor that simply wraps rules in a selector if present
 *
 * @param {String|boolean} key
 *   The selector
 * @param {<type>} content
 * The style rules
 * @return {String}
 */
const simpleProcessor = (key, content) => key ? `${key}{${content}}` : content
// @todo Add something more meaningfull here
const simpleCreateComponent = () => () => {}

/**
 * Private render class. Hnadles the entire rendering logic.
 * Provides a plugin mechanism that allows to set different processors or
 * renderers
 *
 * @private
 * @class Renderer
 */
class Renderer {
  constructor() {
    this[PROCESSOR] = simpleProcessor
    this[CREATE_COMPONENT] = simpleCreateComponent
    this.processCSS = this.processCSS.bind(this)
    this.createComponent = this.createComponent.bind(this)
    this.use = this.use.bind(this)
  }

  /**
   * Adds plugin into instance
   *
   * @param {function} plugin
   *   The plugin function
   * @return {Object}
   */
  use(plugin) {
    this[plugin.stiligita] = plugin
    return {use: this.use}
  }

  /**
   * Calls assigned processor with arguments
   *
   * @param {Array} args
   * @return {function}
   */
  processCSS(...args) {
    return this[PROCESSOR](...args)
  }

  /**
   * Calls assigned renderer with arguments
   *
   * @param {Array} args
   * @return {function}
   */
  createComponent(...args) {
    return this[CREATE_COMPONENT](...args)
  }
}

// Export one instance
export default new Renderer()
