import store from './store'
import {hashCode} from './hash-code'
import {templateWithVars} from './template'

export default function (strings, ...args) {
  const css = templateWithVars(strings, args)
  const id = hashCode(css)
  store.addKeyframes({[id]: css})
  return id
}
