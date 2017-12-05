# stiligita


## Really just a prototype.


Similar to [styled-components](https://github.com/styled-components/styled-components)

```jsx
import React, {Component} from 'react'
import {render} from 'react-dom'
import styled, {Keyframes} from '../src'

const spin = Keyframes`to {transform: rotate(360deg);}`

const Header = styled.header`
  padding: 8em 5em;
  background: ${_ => _.active ? '#fe9f2e' : '#63e2bb'};
  color: black;
  transition: background 1s;
  position: relative;

  &:hover {
    background: ${_ => _.active ? '#ae6f22' : '#49a489'};
    .ball {
     font-size: 10em;
    }
  }

  .ball {
    position: absolute;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    margin: -0.5em;
    height: 1em;
    width: 1em;
    font-size: 5em;
    background: white;
    position: relative;
    transform: rotate(0deg);
    animation: ${spin} 2s linear infinite;
    animation-direction: ${_ => _.active ? 'normal' : 'reverse'};

    &:before {
      font-size: 0.7em;
      content: "${_ => _.active ? '💖' : '😂'}";
    }
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
      <div>
        <Header onClick={this.handleClick}
                active={this.state.active}>
          Stiligita
          <div className='ball'></div>
        </Header>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))

```
