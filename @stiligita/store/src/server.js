import {isFalsy} from '@stiligita/utils'
import createStyleBlock from '@stiligita/stylesheets'
import {render} from '@stiligita/dom'

class Store {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.__KEYS__ = []
    this.__STYLE_TAG__ = null
    this.getName = this.getName.bind(this)
  }

  diff(key) {
    if (isFalsy(key, this.__KEYS__)) {
      return false
    }
    return true
  }

  update() {
    this.__STYLE_TAG__ = createStyleBlock(this.__STYLES__, this.__KEYFRAMES__)
    return Promise.resolve()
  }

  getStyles() {
    return this.__STYLE_TAG__
  }

  getName(hash, ) {
    return render.getName(hash, this.__KEYS__)
  }

  addStyles(obj, prop) {
    const [key] = Object.keys(obj)
    if (this.diff(key)) {
      this.__KEYS__.push(key)
      const newObj = {
        [this.getName(key)]: obj[key]
      }
      this[prop] = {...this[prop], ...newObj}
      this.update()
    }
    // Styles have already been written
    // no need for operations
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
