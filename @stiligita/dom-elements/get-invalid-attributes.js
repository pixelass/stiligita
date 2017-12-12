import {isListener, isTruthy} from '@stiligita/utils'
import htmlAttributes from './attributes'

export default function (props) {
  const elementAttributes = htmlAttributes[props.tag] || []
  const validAttributes = [...htmlAttributes['*'], ...elementAttributes]
  return Object.keys(props)
    // Keep anything that is invalid
    .filter(prop => validAttributes.indexOf(prop) < 0 && !isListener(prop))
    // Remove data and aria attributes
    .filter(prop => isTruthy(prop.substring(0, 5), ['data-', 'aria-']))
}
