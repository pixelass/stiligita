import {domElements} from '@stiligita/dom-elements'
import {render} from '@stiligita/dom'
// Future API
// import {ATTRIBUTES, CONFIGURATION} from '@stiligita/constants'

/**
 * Styled can be called as a function to allow setting properties.
 * This can be used in different ways to create APIs for several renderers.
 * If called as a function the props will be added as an argument to the
 * same render method. To understand how props are used, look into the renderer
 * {@link createReactComponent}
 *
 * @param {String} tag
 *   The tagName that should be used when rendering the final element
 * @param {Object} props
 *   An object that will be passed to the renderer.
 *   To understand how props are used, look into the renderer.
 * @return {*}  inherits the return of the assigned renderer
 */
function styled(tag, props) {
  return (strings, ...args) => {
    // The render.createComponent calls an assigned renderer
    // To understand what this call does you might need to look into the
    // renderer {@link createReactComponent}
    return render.createComponent(strings, args, tag, props)
  }
}

// Add static `use` to allow setting plugins from `styled`
// prevents having to expose the entire render instance
styled.use = plugin => render.use(plugin)
styled.before = plugin => render.before(plugin)

// Add literals for each DOM element
domElements.forEach(tag => {
  styled[tag] = (strings, ...args) => render.createComponent(strings, args, tag)
  // Future API
  // styled[tag].attrs = attrs =>
  //   (strings, ...args) =>
  //     render.createComponent(strings, args, tag, Object.assign({}, attrs, {[ATTRIBUTES]: true}))
  // styled[tag].config = config =>
  //   (strings, ...args) =>
  //     render.createComponent(strings, args, tag, Object.assign({}, config, {[CONFIGURATION]: true}))
})

export default styled
