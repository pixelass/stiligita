import {ensureTruthy} from './_'
import {NAMESPACE} from './constants'
export const minifyCSS = css => css.replace(/\s+/g, ' ').replace(/\s?([:;\,\{\}\(\)])\s?/g, '$1').replace(/;\}/g, '}')

export const createStyleBlock = (rules, keyframes) =>
  minifyCSS(Object.keys(rules)
    .map(key => `[data-${NAMESPACE}="${key}"]{${rules[key]}}`)
    .concat(Object.keys(keyframes)
      .map(key => `@keyframes ${key}{${keyframes[key]}}`)).join(''))

export const createCSS = (strings, args, props) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
  switch(typeof dynamic) {
    case 'function':
      return `${str}${ensureTruthy(dynamic(props))}`
    case 'string':
      return `${str}${dynamic}`
    default:
      throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
  }
}).join('')


export const createKeyframes = (strings, args) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
   switch(typeof dynamic) {
     case 'string':
      return `${str}${dynamic}`
    default:
      throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
  }
}).join('')
