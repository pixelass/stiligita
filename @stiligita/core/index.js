import domElements from '@stiligita/dom-elements'
import {render} from '@stiligita/dom'

const styled = {
  use(plugin) {
    return render.use(plugin)
  }
}

domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => render.createComponent(strings, args, tag)
  styled[tag].displayName = `styled.${tag}`
})

export default styled
