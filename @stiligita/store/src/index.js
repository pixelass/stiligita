import {isFalsy} from '@stiligita/utils'
import createStyleBlock from '@stiligita/stylesheets'

class Store {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.__KEYS__ = []
    this.__STYLE_TAG__ = document.createElement('style')
    document.head.appendChild(this.__STYLE_TAG__)
  }

  diff(key) {
    if (isFalsy(key, this.__KEYS__)) {
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }

  update() {
    this.__STYLE_TAG__.innerHTML = createStyleBlock(this.__STYLES__, this.__KEYFRAMES__)
  }

  addStyles(obj, prop) {
    const [key] = Object.keys(obj)
    this.diff(key).then(undef => {
      if (undef) {
        this[prop] = {...this[prop], ...obj}
        this.__KEYS__.push(key)
        this.update()
      }
      // Styles have already been written
      // no need for operations
    })
  }

  addRules(obj) {
    this.addStyles(obj, '__STYLES__')
  }

  addKeyframes(obj) {
    this.addStyles(obj, '__KEYFRAMES__')
  }
}

const store = new Store()
export {store}
export default store
