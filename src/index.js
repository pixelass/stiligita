import {createElement} from 'react'
import Abcq from 'abcq'
import uuid from 'uuid/v4'
import omit from 'lodash.omit'
import htmlElementAttributes from 'html-element-attributes'
import domElements from './dom-elements'

const hashCode = (s) =>{
  return s.split('').reduce((a,b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}

const shortid = new Abcq()

const createStyleBlock = s => Object.keys(s).map(key => {
  return `.${key.split(':')[0] + '{'}${s[key]}${'}'}`
}).join('\n')

class Styled {
  constructor() {
    this.__STYLES__ = {}
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

const createComponent = (args, {domElement}) => {
  const [strings] = args
  args.shift()
  let css
  let id = uuid()
  const component = (p) => {
    const pp = {...p, children: null}
    const pString = JSON.stringify(pp)
    css = strings.map((str, i) => {
      const dynamic = args[i] || ''
      let addon = dynamic
      if (typeof dynamic === 'function') {
        addon = dynamic(p) || ''
      }
      return `${str}${addon}`
    }).join('').replace(/\n+/,'\n')
    const className = createClassName(id, pString)
    styled.__STYLES__[className] = css.replace(/\s+/g, ' ')
    if (!styled.STYLE_TAG.innerHTML.match(`.${className}{`)) {
      styled.STYLE_TAG.innerHTML = createStyleBlock(styled.__STYLES__)
    }
    const allA = htmlElementAttributes['*']
    const theseA = htmlElementAttributes[domElement] || []

    const removeAttrs = Object.keys(p).filter(_ => [...allA, ...theseA, 'children'].indexOf(_) < 0)
    return createElement(domElement, {...omit(p, removeAttrs), className})
  }
  return component
}

export default styled
