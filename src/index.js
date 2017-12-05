import React, {createElement, Component} from 'react'
import Abcq from 'abcq'
import uuid from 'uuid/v4'
import omit from 'lodash.omit'
import htmlElementAttributes from 'html-element-attributes'
import Stylis from 'stylis'
import domElements from './dom-elements'


const stylis = new Stylis({keyframe: false, compress: false})

const hashCode = (s) =>{
  return s.split('').reduce((a,b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}

const filterObject = obj => {
  for (var i in obj) {
    if (!obj[i]) {
      delete obj[i];
    }
  }
  return obj
}

const shortid = new Abcq()

const createStyleBlock = (s, k) => {
  const styles = Object.keys(s).map(key => {
    return stylis(`.${key}`, s[key])
  }).join('')
  const keyframes = Object.keys(k).map(key => {
    return stylis('', `@keyframes ${key} {${k[key]}}`)
  }).join('')
  return [styles, keyframes].join('')
}

class Styled {
  constructor() {
    this.__STYLES__ = {}
    this.__KEYFRAMES__ = {}
    this.STYLE_TAG = document.createElement('style')
  }

  init() {
    document.head.appendChild(this.STYLE_TAG)
  }
}

const styled = new Styled()
styled.init()

domElements.forEach(domElement => {
  styled[domElement] = (..._) => createComponent(_, {domElement})
})

const createClassName = (id, pString) => {
  return shortid.encode(Math.abs(hashCode(id + pString)))
}

const notListener = _ => {
  const [o,n,C] = _
  return !(o === 'o' && n === 'n' & C === C.toUpperCase())
}

const createCSS = (strings, args, props) => strings.map((str, i) => {
    const dynamic = args[i] || ''
    let addon = dynamic
    if (typeof dynamic === 'function') {
      addon = dynamic(props) || ''
    }
    return `${str}${addon}`
  }).join('')

const starAttributes = htmlElementAttributes['*']

class Stiligita extends Component {
  constructor(props) {
    super(props)
    this.state = {
      removeAttrs: []
    }
    this.cleanUp = this.cleanUp.bind(this)
  }
  componentWillReceiveProps(newProps) {
    this.cleanUp(newProps)
  }
  componentWillMount() {
    this.cleanUp(this.props)
  }
  cleanUp(props) {
    const elementAttributes = htmlElementAttributes[props.domElement] || []
    const validAttributes = [...starAttributes, ...elementAttributes, 'children']
    this.setState({
      removeAttrs: Object.keys(props).filter(_ => validAttributes.indexOf(_) < 0 && notListener(_))
    })
  }
  render(){
    const {removeAttrs} = this.state
    const props = omit(this.props, removeAttrs)
    return createElement(this.props.domElement, {...props, className: this.props.className})
  }
}

const createComponent = (args, {domElement}) => {
  const [strings] = args
  args.shift()
  let id = uuid()
  return (p = {}) => {
    const pp = filterObject(omit(p, ['children']))
    const pString = JSON.stringify(pp)
    const css = createCSS(strings, args, p)
    const className = createClassName(id, pString)
    styled.__STYLES__[className] = css.replace(/\s+/g, ' ')
    if (!styled.STYLE_TAG.innerHTML.match(`.${className}{`)) {
      styled.STYLE_TAG.innerHTML = createStyleBlock(styled.__STYLES__, styled.__KEYFRAMES__)
    }
    return <Stiligita {...p} className={className} domElement={domElement}/>
  }
}

export const Keyframes = (...args ) => {
  const [strings] = args
  args.shift()
  const id = createClassName(uuid(), '')
  styled.__KEYFRAMES__[id] = strings.join('')
  return id
}

export default styled
