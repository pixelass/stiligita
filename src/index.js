import {createElement} from 'react'
import domElements from './dom-elements'
import store from './store'
import {createComponent} from './template'
export {default as Keyframes} from './keyframes'

const styled = {}

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => createComponent(strings, args, tag)
  styled[tag].displayName = `styled.${tag}`
})

export default styled
