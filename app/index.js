import React, {Component} from 'react'
import {render} from 'react-dom'
import styled, {Keyframes} from '../src'

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
                active={this.state.active}>
          <Title active={this.state.active}>
            <Spinner active={this.state.active}>🌀</Spinner>
            Click me
            <Spinner active={!this.state.active}>🌀</Spinner>
          </Title>
        </Header>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
