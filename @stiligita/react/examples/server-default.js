const React = require('react')
const {renderToStaticMarkup} = require('react-dom/server')
const styled = require('@stiligita/core').default
const {ServerStyleSheet} = require('@stiligita/stylesheets')
const react = require('../lib').default

styled.use(react)

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
