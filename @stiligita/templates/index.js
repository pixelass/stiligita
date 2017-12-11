import {ensureTruthy} from '@stiligita/utils'

export const templateWithProps = (strings, args, props = {}) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
  switch(typeof dynamic) {
    case 'function':
      return `${str}${ensureTruthy(dynamic(props))}`
    case 'string':
      return `${str}${dynamic}`
    default:
      throw new TypeError(`Cannot create stylesheet from ${typeof dynamic}`)
  }
}).join('')


export const templateWithVars = (strings, args) => strings.map((str, i) => {
  const dynamic = ensureTruthy(args[i])
   switch(typeof dynamic) {
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
