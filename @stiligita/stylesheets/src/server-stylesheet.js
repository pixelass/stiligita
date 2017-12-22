import store from '@stiligita/store'

class ServerStyleSheet {
  getStyleTag() {
    return `<style>${this.getStyles()}</style>`
  }
  getStyles() {
    return store.getStyles()
  }
}

export default ServerStyleSheet
