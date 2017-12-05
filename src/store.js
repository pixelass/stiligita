class Store {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.__STYLE_TAG__ = document.createElement('style')
    document.head.appendChild(this.__STYLE_TAG__)
  }
}

export default Store
