import {htmlAttributes} from './react-dom-elements'
import {isListener, isTruthy} from './_'
export default function(props) {
  const elementAttributes = htmlAttributes[props.tag] || []
  const validAttributes = [...htmlAttributes['*'], ...elementAttributes, 'children']
  return Object.keys(props)
    // keep anything that is invalid
    .filter(prop => validAttributes.indexOf(prop) < 0 && !isListener(prop))
    // remove data and aria attributes
    .filter(prop => isTruthy(prop.substring(0, 5),['data-', 'aria-']))
}
