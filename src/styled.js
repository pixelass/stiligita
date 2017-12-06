import domElements from './dom-elements'
import {createComponent} from './template'

const styled = {}

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => createComponent(strings, args, tag)
  styled[tag].displayName = `styled.${tag}`
})

export default styled
