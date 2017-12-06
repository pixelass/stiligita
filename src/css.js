import {NAMESPACE} from './constants'
export const minifyCSS = css => css.replace(/\s+/g, ' ').replace(/\s?([:;\,\{\}\(\)])\s?/g, '$1').replace(/;\}/g, '}')

export const createStyleBlock = (rules, keyframes) =>
  minifyCSS(Object.keys(rules)
    .map(key => `[data-${NAMESPACE}="${key}"]{${rules[key]}}`)
    .concat(Object.keys(keyframes)
      .map(key => `@keyframes ${key}{${keyframes[key]}}`)).join(''))
