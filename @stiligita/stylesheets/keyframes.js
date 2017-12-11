import hashCode from '@stiligita/hash-code'
import {store} from '@stiligita/store'
import {templateWithVars} from '@stiligita/templates'

const keyframes = (strings, ...args) => {
  const css = templateWithVars(strings, args)
  const id = hashCode(css)
  store.addKeyframes({[id]: css})
  return id
}

export default keyframes
