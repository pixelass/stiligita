import {GET_NAME, PRE_PROCESSOR, PROCESSOR, CREATE_COMPONENT, CREATE_SELECTOR} from '@stiligita/constants'

/**
 * A simple CSS processor that simply wraps rules in a selector if present
 *
 * @param {String|boolean} key
 *   The selector
 * @param {String} content
 * The style rules
 * @return {String}
 */
const simpleProcessor = (key, content) => key ? `${key}{${content}}` : content
const simplePreProcessor = rules => rules
const simpleGetName = name => name
// @todo Add something more meaningfull here
const simpleCreateComponent = () => () => {}

/**
 * Default createSelector implementation emitting [data-styled="id"] selectors
 * @param {String} id
 * @param {String} mode
 */
const simpleCreateSelector = (id, mode) => {
  switch (mode) {
    case 'css':
      return `[data-styled*="${id}"]`
    case 'html':
      return {'data-styled': id}
    default:
      throw new TypeError(`Unknown createSelector case "${mode}". Use "css" or "html"`)
  }
}

simpleCreateSelector[CREATE_SELECTOR] = 'data-styled'

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
    this[PRE_PROCESSOR] = simplePreProcessor
    this[PROCESSOR] = simpleProcessor
    this[GET_NAME] = simpleGetName
    this[CREATE_COMPONENT] = simpleCreateComponent
    this[CREATE_SELECTOR] = simpleCreateSelector
    this.processCSS = this.processCSS.bind(this)
    this.createComponent = this.createComponent.bind(this)
    this.use = this.use.bind(this)
    this.before = this.before.bind(this)
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
    return this.methods
  }

  /**
   * Adds plugin into instance
   *
   * @param {function} plugin
   *   The plugin function
   * @return {Object}
   */
  before(plugin) {
    switch (plugin.stiligita) {
      case PROCESSOR:
        this[PRE_PROCESSOR] = plugin
        break
      default:
        break
    }
    return this.methods
  }

  get methods() {
    return {
      before: this.before,
      use: this.use
    }
  }

  /**
   * Calls assigned pre-processor with arguments
   *
   * @param {Array} args
   * @return {function}
   */
  preProcessCSS(...args) {
    return this[PRE_PROCESSOR](...args)
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
   * Calls assigned processor with arguments
   *
   * @param {Array} args
   * @return {function}
   */
  getName(...args) {
    return this[GET_NAME](...args)
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
