import {NAMESPACE} from '@stiligita/constants'
import {render} from '@stiligita/dom'
export const minifyCSS = css => css.replace(/\s+/g, ' ').replace(/\s?([:;\,\{\}\(\)])\s?/g, '$1').replace(/;\}/g, '}')

/**
 * sends style rules and keyframes into a processor and returns the result
 *
 * @param {<type>} rules
 *   The rules
 * @param {<type>} keyframes
 *   The keyframes
 * @return {String} A proccesed css string
 */
export default function(rules, keyframes) {
  return minifyCSS(Object.keys(rules)
    .map(key =>
      render.processCSS(`[data-${NAMESPACE}="${key}"]`,`${rules[key]}`))
    .concat(Object.keys(keyframes).map(key =>
      render.processCSS('',`@keyframes ${key}{${keyframes[key]}}`))).join(''))
}
