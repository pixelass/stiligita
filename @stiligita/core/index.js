import domElements from '@stiligita/dom-elements'
import {render} from '@stiligita/dom'

function styled(tag, props) {
  return (strings, ...args) => {
    return render.createComponent(strings, args, tag, props)
  }
}

styled.use = plugin => render.use(plugin)

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => render.createComponent(strings, args, tag)
  styled[tag].displayName = `styled.${tag}`
})

export default styled
