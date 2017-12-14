import {isTruthy} from '@stiligita/utils'
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
    if (isTruthy(key, this.__KEYS__)) {
      return Promise.resolve()
    }
    return Promise.reject()
  }

  update() {
    this.__STYLE_TAG__.innerHTML = createStyleBlock(this.__STYLES__, this.__KEYFRAMES__)
  }

  addStyles(obj, prop) {
    const [key] = Object.keys(obj)
    this.diff(key).then(() => {
      // Original: {...this[prop], ...obj}
      this[prop] = Object.assign({}, this[prop], obj)
      this.__KEYS__.push(key)
      this.update()
    }).catch(err => {
      console.error(err)
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
