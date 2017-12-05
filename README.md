# stiligita


## Really just a prototype.


Similar to [styled-components](https://github.com/styled-components/styled-components)

```jsx

import React from 'react'
import {render} from 'react-dom'
import styled from '../src'

const Header = styled.header`
  background: red;
  color: green;
`

const Footer = styled.header`
padding: 2em;
background: #ccc;
${p => p.dark && `
  background: black;
  color: white;
`}
`
const App = () => (
<div>
  <Header>Foo Bar BAz</Header>
  <Footer dark>Foo Bar BAz</Footer>
  <Footer>Foo Bar BAz</Footer>
  <Footer>Foo Bar BAz</Footer>
  <Footer>Foo Bar BAz</Footer>
  <Footer>Foo Bar BAz</Footer>
  <Footer>Foo Bar BAz</Footer>
</div>
)

render(<App/>, document.getElementById('app'))

```
