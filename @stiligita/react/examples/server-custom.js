const React = require('react')
const {renderToStaticMarkup} = require('react-dom/server')
const styled = require('@stiligita/core').default
const {ServerStyleSheet} = require('@stiligita/stylesheets')
const {PROCESSOR, GET_NAME, CREATE_SELECTOR} = require('@stiligita/constants')
const Abcq = require('abcq')
const react = require('../lib').default

const shortid = new Abcq()

const safelyAlphanumeric = (a, b) => {
  const propA = a.split(':')[0]
  const propB = b.split(':')[0]
  const propAPre = propA.split('-')[0]
  const propBPre = propB.split('-')[0]
  if (propAPre > propBPre) {
    return 1
  }
  if (propAPre < propBPre) {
    return -1
  }
  if (propA > propB) {
    return 1
  }
  if (propA < propB) {
    return -1
  }
  return 0
}

const sortCSSProps = rules => {
  rules = rules.split(';').filter(Boolean)
  .sort(safelyAlphanumeric)
  .join(';')
  return rules
}
sortCSSProps.stiligita = PROCESSOR

const shortId = (key, keys) => shortid.encode(keys.indexOf(key))
shortId.stiligita = GET_NAME

const createClassName = (hash, mode) => {
  switch (mode) {
    case 'css':
      return `.${hash}`
    case 'html':
      return {className: hash}
    default:
      throw new Error(`${mode} is not a supported mode. Please use one of ['css', 'html']`)
  }
}

createClassName.stiligita = CREATE_SELECTOR
createClassName[CREATE_SELECTOR] = 'className'

styled
  .before(sortCSSProps)
  .use(react)
  .use(shortId)
  .use(createClassName)

const Wrapper = styled.div`
  background: #fff;
  color: #000;
`

const PageTitle = styled.h1`
  user-select: none;
  font-size: 4em;
  margin: 0;
`

const SecondTitle = styled.h2`
  margin: 0;
  font-size: 4em;
  user-select: none;
`

const Foo = styled.span`
  margin: 0;
`

const Bar = styled(Foo)`
  padding: 0;
`

const staticApp = () => React.createElement(Wrapper, null,
  React.createElement(Foo, null, 'Foo!'),
  React.createElement(Bar, null, 'Foo + Bar!'),
  React.createElement(PageTitle, null, 'Reusing selectors!'),
  React.createElement(SecondTitle, null, 'Reusing selectors!'))

const markup = renderToStaticMarkup(staticApp())
const sheet = new ServerStyleSheet()
console.log(markup)
console.log(sheet.getStyleTag())
