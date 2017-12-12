// @todo move to react?
export const isListener = onEvent => {
  const [o, n, Event] = onEvent
  return o === 'o' && n === 'n' & Event === Event.toUpperCase()
}

/**
 * Determines if truthy.
 *
 * @param {*} input
 *   The input
 * @param {(Array|string)} reject
 *   A list of items that will be rejected if they match
 * @return {boolean} True if truthy, False otherwise.
 */
export const isTruthy = (input, reject = [undefined, null, false]) => reject.indexOf(input) < 0

/**
 * Determines if falsy.
 *
 * @param {*} input
 *   The input
 * @param {Array} reject
 *   A list of items that will be rejected if they match
 * @return {boolean} True if falsy, False otherwise.
 */
export const isFalsy = (input, reject = [undefined, null, false]) => !isTruthy(input, reject)

/**
 * { lambda_description }
 *
 * @param {*} input
 *   The input
 * @param {string} fallback
 *   The fallback
 * @param {Array} reject
 *   A list of items that will be rejected if they match
 * @return {*}
 */
export const ensureTruthy = (input, fallback = '', reject = [undefined, null, false]) =>
  isFalsy(input, reject) ? fallback : input

/**
 * Filters an object by its falsy props
 *
 * @param {Object} obj
 *   The object original object
 * @return {Object} The filtered object
 */
export const filterObject = obj => Object.keys(obj)
  .filter(key => isTruthy(obj[key]))
  .map(prop => ({[prop]: obj[prop]}))
  .reduce((a, b) => ({...a, ...b}), {})

/**
 * Claens an object by a list of removals
 *
 * @param {Object} obj
 *   The object original object
 * @param {Array} removals
 *   A list of items that will be removed if they match
 * @return {Object} The cleaned object
 */
export const cleanObject = (obj, removals) => Object.keys(obj)
  .filter(key => isTruthy(key, removals))
  .map(prop => ({[prop]: obj[prop]}))
  .reduce((a, b) => ({...a, ...b}), {})

