const store = require('@stiligita/store').default

class ServerStyleSheet {
  getStyleTag() {
    return `<style>${this.getStyles()}</style>`
  }
  getStyles() {
    return store.getStyles()
  }
}

export default ServerStyleSheet
