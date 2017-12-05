import htmlAttributes, {elements} from 'react-html-attributes'

export {htmlAttributes}
export const starAttributes = htmlAttributes['*']

export default [...elements.html, ...elements.svg]
