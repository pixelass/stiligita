import hashCode from '@stiligita/hash-code'
import {store} from '@stiligita/store'
import {templateWithVars} from '@stiligita/templates'

/**
 * Simple keyframe helper. Creates kayframes, writes them to the store and
 * returns its name as id
 *
 * @param {Array strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @return {String} The id can be used to link this animation
 */
const keyframes = (strings, ...args) => {
  const css = templateWithVars(strings, args)
  const id = hashCode(css)
  store.addKeyframes({[id]: css})
  return id
}

export default keyframes
