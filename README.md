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

## Example: nested css & prefixing

Stiligita allows you to choose a cssProcessor.


```js
import Stylis from 'stylis'
import {render} from 'stiligita'
// enable nested rules, and prefixing
render.processor = new Stylis()
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


## Default: "no helpers" = fast small and simple

```jsx
import React, {Component} from 'react'
import {render} from 'react-dom'
import styled, {Keyframes} from 'stiligita'

const spin = Keyframes`to {transform: rotate(360deg);}`

const Header = styled.header`
  user-select: none;
  background: ${_ => _.active ? '#000' : '#fff'};
  color: ${_ => _.active ? '#fff' : '#000'};
  cursor: pointer;
`

const Spinner = styled.span`
  position: relative;
  display: inline-block;
  animation: ${spin} 2s linear infinite;
  animation-direction: ${_ => _.active ? 'normal' : 'reverse'};
`
const Title = styled.h1`
  font-family: 'Comic Sans MS';
  font-size: 4em;
  margin: 0;
  text-align: center;
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
      <div>
        <Header onClick={this.handleClick}
                active={this.state.active}
                data-foo="I should work">
          <Title aria-label="Click me to change the state">
            <Spinner active={this.state.active}>🌀</Spinner>
            Click me
          </Title>
        </Header>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))

```
