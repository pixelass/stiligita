import {ensureTruthy} from '@stiligita/utils'

/**
 * Creates CSS from a list of strings and interpolations.
 * If interpolations are functions they may be called with `props`
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @param {Object} props
 *   The properties used to resolve the interpolated functions
 * @return {String}
 */
export const templateWithProps = (strings, args, props = {}) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
  switch (typeof dynamic) {
    case 'function':
      return `${str}${ensureTruthy(dynamic(props))}`
    case 'string':
      return `${str}${dynamic}`
    default:
      throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
  }
}).join('')

/**
 * Creates CSS from a list of strings and interpolations.
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @return {String}
 */
export const templateWithVars = (strings, args) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
  switch (typeof dynamic) {
    case 'string':
      return `${str}${dynamic}`
    default:
      throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
  }
}).join('')

export default {
  templateWithProps,
  templateWithVars
}
