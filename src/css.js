import {NAMESPACE} from './constants'
import render from './render'
export const minifyCSS = css => css.replace(/\s+/g, ' ').replace(/\s?([:;\,\{\}\(\)])\s?/g, '$1').replace(/;\}/g, '}')

export const createStyleBlock = (rules, keyframes) =>
  minifyCSS(Object.keys(rules)
    .map(key => render.processCSS(`[data-${NAMESPACE}="${key}"]`,`${rules[key]}`))
    .concat(Object.keys(keyframes)
      .map(key =>  render.processCSS('',`@keyframes ${key}{${keyframes[key]}}`))).join(''))
