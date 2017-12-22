import {CREATE_SELECTOR} from '@stiligita/constants'
import {render} from '@stiligita/dom'
import minify from './minify'

export {default as ServerStyleSheet} from './server-stylesheet'

/**
 * Sends style rules and keyframes into a processor and returns the result
 *
 * @param {String} rules
 *   The rules
 * @param {String} keyframes
 *   The keyframes
 * @return {String} A proccesed css string
 */
export default function (rules, keyframes) {
  return minify(Object.keys(rules)
    .map(key =>
      render.processCSS(render[CREATE_SELECTOR](key, 'css'), `${rules[key]}`))
    .concat(Object.keys(keyframes).map(key =>
      render.processCSS('', `@keyframes ${key}{${keyframes[key]}}`))).join(''))
}
