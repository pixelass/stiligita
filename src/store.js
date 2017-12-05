class Store {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.STYLE_TAG = document.createElement('style')
    document.head.appendChild(this.STYLE_TAG)
  }
}

export default Store
