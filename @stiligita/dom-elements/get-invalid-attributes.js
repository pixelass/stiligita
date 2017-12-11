import htmlAttributes from './attributes'
import {isListener, isTruthy} from '@stiligita/utils'
export default function(props) {
  const elementAttributes = htmlAttributes[props.tag] || []
  const validAttributes = [...htmlAttributes['*'], ...elementAttributes]
  return Object.keys(props)
    // keep anything that is invalid
    .filter(prop => validAttributes.indexOf(prop) < 0 && !isListener(prop))
    // remove data and aria attributes
    .filter(prop => isTruthy(prop.substring(0, 5),['data-', 'aria-']))
}
