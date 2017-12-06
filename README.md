# 🔫 stiligita 🌀


## Really just a prototype.


> 🔫 Stiligita is styled components for everybody 🌀  
> Simple recipe for everybodies taste  
> just add water and stir.

## Idea.

| Esperanto | Emglish      | React             | Angular   | HTML       | ...?       |
| --------- | ------------ | ----------------- | ----------| ---------- | ---------- |
| stiligita | streamlined  | stiligita         | stiligita | stiligita  | stiligita  |
|           | styled       | styled-components |           |            |            |
|           | stylized     |                   |           |            |            |

Similar to [styled-components](https://github.com/styled-components/styled-components) but a lot simpler and smaller.

Stiligita does not intend to provide all features of "styled-cpmonents" but you can build these features if you need them.  
Need styled-componets in angular? Just add water (angular) and stir (privde a wrapper).


## Vanilla: It doesn't get easier than this.

```js
import styled from '../src'

const APP = document.getElementById('app')

const theme = {
  primary: '#ff0080',
  light: '#ccff66',
  dark: '#008000',
  lightText: '#fff',
  darkText: '#000'
}

const Wrapper = styled.div`
  background: ${theme.light};
  color: ${theme.darkText};
  display: grid;
  grid-template-rows: 100px auto 100px;
  grid-template-areas: "header" "main" "footer";
  min-height: calc(100vh - 1em);
`

const Header = styled.header`
  grid-area: header;
  background: ${theme.dark};
  color: ${theme.lightText};
`

APP.appendChild(Wrapper({children: Header({children: 'Stiligita'})}))

```

## Adding React

Stiligita allows you to choose a RenderEngine.

```jsx
import React, {Component} from 'react'
import {render} from 'react-dom'
import Stylis from 'stylis'
import styled, {Keyframes, render as renderStyled} from 'stiligita'
import renderReact from 'stiligita/lib/stiligita-react'
import {PROCESSOR} from 'stiligita/lib/constants'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

renderStyled
  .use(renderReact)
  .use(stylis)

const spin = Keyframes`to {transform: rotate(360deg);}`

const theme = {
  primary: '#ff0080',
  light: '#ccff66',
  dark: '#008000',
  lightText: '#fff',
  darkText: '#000'
}

const Wrapper = styled.div`
  background: ${theme.light};
  color: ${theme.darkText};
  display: grid;
  grid-template-rows: 100px auto 100px;
  grid-template-areas: "header" "main" "footer";
  min-height: calc(100vh - 1em);
`

const Header = styled.header`
  grid-area: header;
  background: ${theme.dark};
  color: ${theme.lightText};
`

const Footer = styled.footer`
  grid-area: footer;
  background: ${theme.dark};
  color: ${theme.lightText};
`

const Spinner = styled.span`
  position: relative;
  display: inline-block;
  animation: ${spin} 2s linear infinite;
  animation-direction: ${_ => _.active ? 'normal' : 'reverse'};
`

const Title = styled.h1`
  user-select: none;
  font-family: 'Comic Sans MS';
  font-size: 4em;
  margin: 0;
  text-align: center;
`

const Button = styled.button`
  background: ${props => props.primary ? '#66ffff' : '#b3b3b3'};
  color: black;
  padding: 1em 2em;
  line-height: 1;
  font-size: 1em;
  border: 0;
  border-radius: 1.5em;

  &:hover {
    background: ${props => props.primary ? '#66ccff' : '#999999'};
  }
`

class App extends Component {
  constructor(){
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return (
      <Wrapper>
        <Header data-foo="I should work">
          <Title aria-label="Click me to change the state">
            <Spinner active={this.state.active}>🔫</Spinner>
            Stiligita
            <Spinner active={this.state.active}>🌀</Spinner>
          </Title>
        </Header>
        <main>
          <Button onClick={this.handleClick} primary>Switch direction</Button>
          <Button onClick={this.handleClick}>Switch direction</Button>
        </main>
        <Footer>© 2017 | Gregor Adams greg@pixelass.com</Footer>
      </Wrapper>
    )
  }
}

render(<App/>, document.getElementById('app'))
```

## Nested css & prefixing

Stiligita allows you to choose a cssProcessor.

```js
import Stylis from 'stylis'
import styled, {render as renderStyles} from 'stiligita'
import {PROCESSOR} from 'stiligita/lib/constants'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

renderStyled
  .use(stylis)
```

**The API changes from**

```js
const Button = styled.button`
  background: ${props => props.primary ? '#66ffff' : '#b3b3b3'};
  color: white;
`
```

**to**

```js
const Button = styled.button`
  background: ${props => props.primary ? '#66ffff' : '#b3b3b3'};
  color: white;

  &:hover {
    background: ${props => props.primary ? '#66ccff' : '#999999'};
  }
`
```


