const React = require('react')
const {renderToStaticMarkup} = require('react-dom/server')
const styled = require('@stiligita/core').default
const {ServerStyleSheet} = require('@stiligita/stylesheets')
const react = require('../lib').default

styled.use(react)

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
