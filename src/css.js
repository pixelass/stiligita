//import Stylis from 'stylis'
import {ensureTruthy} from './_'

//const ProcessCSS = new Stylis({keyframe: false, compress: false, prefix: false})
export const minifyCSS = css => css.replace(/\s+/g, ' ').replace(/\s?([:;\,\{\}\(\)])\s?/g, '$1').replace(/;\}/g, '}')

export const createStyleBlock = (rules, keyframes) => {
  const proccesedRules = Object.keys(rules).map(key => {
    return `.${key}{${rules[key].trim()}}` //ProcessCSS(`.${key}`, `${rules[key]}`)
  }).join('')
  const proccesedKeyframes = Object.keys(keyframes).map(key => {
    return `@keyframes ${key}{${keyframes[key].trim()}}`//ProcessCSS('',`@keyframes ${key} {${keyframes[key]}}`)
  }).join('')
  return minifyCSS(`${proccesedRules}${proccesedKeyframes}`)
}

export const createCSS = (strings, args, props) => {
  const parts = strings.map((str, i) => {
    const dynamic = ensureTruthy(args[i]) || ''
    switch(typeof dynamic) {
      case 'function':
        return `${str}${ensureTruthy(dynamic(props)) || ''}`
      case 'string':
        return `${str}${dynamic}`
      default:
        throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
    }
  })
  return parts.join('')
}
