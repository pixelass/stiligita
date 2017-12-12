/**
 * Prefixes a string with an underscore if the first character is a number
 *
 * @param {String} selector
 * @return {String}
 */
const ensureSelector = selector => selector[0].match(/[0-9]/) ? `_${selector}` : selector

/**
 * Creates a hash from a String and then converts it to a base 36 String.
 *
 * @param {String} str
 * The string that should be converted to a hash
 * @todo This is not safe 🤡
 * @return {String}
 */
const hashCode = str => ensureSelector(str.split('').reduce((a, b) => {
  a = ((a << 5) - a) + b.charCodeAt(0)
  return a & a
}, 0).toString(36).replace('-', '_'))

export default hashCode
