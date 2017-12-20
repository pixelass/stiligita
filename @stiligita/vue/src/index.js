import hashCode from '@stiligita/hash-code'
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants'
import {templateWithProps} from '@stiligita/templates'
import {store} from '@stiligita/store'

/**
 * Create CSS from arguments and props. Then create hash from CSS.
 * return both.
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @param {Object} props
 *   The properties used to resolve the interpolated functions
 * @return {Object}
 */
const assignStyled = (strings, args, props) => {
  const css = templateWithProps(strings, args, props)
  const hash = hashCode(css)
  return {css, hash}
}

/**
 * Creates a Vue component and adds a data-attribute with a style-id.
 * The style is written to the store to allow updates
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @param {String} tag
 *   The tagName that will be used to render the final element
 * @param {Object} defaultProps
 *   Props that are allowed to be set by the component instance.
 * @return {Object}
 */
const createVueComponent = (strings, args, tag, defaultProps = {}) => {
  return ({
    props: {...defaultProps},
    render(h) {
      const {propsData = {}, listeners = {}} = this.$vnode.componentOptions
      // Create css and hash, then write it to the store
      const {css, hash} = assignStyled(strings, args, propsData)
      store.addRules({[hash]: css})
      // Return a styled Vue element
      // Passes listeners
      // Adds data attribute to link to styles
      return h(tag, {
        on: listeners,
        // Vue will only accept valid attributes here
        domProps: {
          ...propsData
        },
        // Anything custom (as data-*) can be added here
        attrs: {
          [`data-${NAMESPACE}`]: hash
        }
      },
      // Render the default slot
      // @todo Is this correct?
      this.$slots.default)
    }
  })
}

createVueComponent.stiligita = CREATE_COMPONENT

export default createVueComponent
