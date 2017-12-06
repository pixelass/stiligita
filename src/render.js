const simpleProcessor = (key, content) => key ? `${key}{${content}}` : content

class Renderer {
  constructor() {
    this.__PROCESSOR__ = simpleProcessor
    this.processCSS = this.processCSS.bind(this)
  }
  set processor(processor) {
    this.__PROCESSOR__ = processor
  }
  processCSS(key, content) {
    return this.__PROCESSOR__(key, content)
  }
}

export {Renderer}
export default new Renderer()
