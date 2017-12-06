import React from 'react'
import {ensureTruthy} from './_'
import {hashCode} from './hash-code'
import store from './store'
import Stiligita from './stiligita'

export const templateWithProps = (strings, args, props) => strings.map((str, i) => {
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

export const createComponent = (strings, args, tag) => props => {
  const css = templateWithProps(strings, args, props)
  const className = hashCode(css)
  store.addRules({[className]: css})
  return <Stiligita {...props} sid={className} tag={tag}/>
}
