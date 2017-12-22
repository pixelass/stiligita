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
    }
}

createClassName.stiligita = CREATE_SELECTOR;

styled
  .before(sortCSSProps)
  .use(react)
  .use(shortId)
  .use(createClassName)

const Wrapper = styled.div`
  background: #fff;
  color: #000;
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  grid-template-areas: "header" "main" "footer";
  min-height: calc(100vh - 1em);
`

const PageTitle = styled.h1`
  user-select: none;
  font-family: Arial, Verdana, sans-serif;
  font-weight: lighter;
  font-size: 4em;
  margin: 0;
  text-align: center;
`

const SecondTitle = styled.h2`
  margin: 0;
  font-family: Arial, Verdana, sans-serif;
  font-weight: lighter;
  font-size: 4em;
  text-align: center;
  user-select: none;
`

const staticApp = () => React.createElement(Wrapper, null,
  React.createElement(PageTitle, null, 'Reusing selectors!'),
  React.createElement(SecondTitle, null, 'Reusing selectors!'))

const markup = renderToStaticMarkup(staticApp())
const sheet = new ServerStyleSheet()
console.log(markup)
console.log(sheet.getStyleTag())
