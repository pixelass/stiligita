import {createStyleBlock} from './css'

class Store {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.__STYLE_TAG__ = document.createElement('style')
    document.head.appendChild(this.__STYLE_TAG__)
  }

  diff(css) {
    return this.__CACHE__ !== JSON.stringify(css)
  }

  update(css) {
    if (this.diff(css)) {
      this.__STYLE_TAG__.innerHTML = createStyleBlock(this.__STYLES__, this.__KEYFRAMES__)
    }
  }

  addStyles(obj) {
    this.__CACHE__ = JSON.stringify(this.__STYLES__)
    this.__STYLES__ = {...this.__STYLES__, ...obj}
    this.update(this.__STYLES__)
  }

  addKeyframes(obj) {
    this.__CACHE__ = JSON.stringify(this.__KEYFRAMES__)
    this.__KEYFRAMES__ = {...this.__KEYFRAMES__, ...obj}
    this.update(this.__KEYFRAMES__)
  }
}

export {Store}
export default new Store()
