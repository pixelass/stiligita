import domElements from './dom-elements'
import render from './render'

const styled = {}

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => render.createComponent(strings, args, tag)
  styled[tag].displayName = `styled.${tag}`
})

export default styled
