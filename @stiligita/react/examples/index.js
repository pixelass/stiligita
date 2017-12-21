import React, {Component} from 'react'
import {render} from 'react-dom'
import Stylis from 'stylis'
import styled from '@stiligita/core'
import keyframes from '@stiligita/keyframes'
import {PROCESSOR} from '@stiligita/constants'
import react from '../src'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR
styled
  .use(react)
  .use(stylis)

const spin = keyframes`to {transform: rotate(360deg);}`

const theme = {
  primary: '#0080ff',
  light: '#66ccff',
  dark: '#004080',
  secondary: '#ff0080',
  secondaryLight: '#ff6fcf',
  secondaryDark: '#800040',
  lightText: '#fff',
  darkText: '#000'
}

const Wrapper = styled.div`
  background: #fff;
  color: ${theme.darkText};
  display: grid;
  grid-template-rows: 100px 1fr 100px;
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
  animation-direction: ${props => props.active ? 'normal' : 'reverse'};
`

const PageTitle = styled.h1`
  user-select: none;
  font-family: Arial, Verdana, sans-serif;
  font-weight: lighter;
  font-size: 4em;
  margin: 0;
  text-align: center;
`

const Button = styled('button', {
  type: 'button'
})`
  background: ${props => props.primary ? theme.primary : theme.secondary};
  color: black;
  padding: 1em 2em;
  margin 0.5em;
  line-height: 1;
  font-size: 1em;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 2px ${props => props.primary ? theme.light : theme.secondaryLight};
  cursor: pointer;

  &:hover {
    color: ${theme.lightText};
    background: ${props => props.primary ? theme.dark : theme.secondaryDark};
  }

  &:active {
    box-shadow:
      0 0 0 2px ${props => props.primary ? theme.light : theme.secondaryLight},
      0 3px 5px 2px ${props => props.primary ? theme.dark : theme.secondaryDark};
  }

  &:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px ${props => props.primary ? theme.light : theme.secondaryLight},
      0 3px 5px 2px ${props => props.primary ? theme.dark : theme.secondaryDark},
      0 2px 7px 2px ${props => props.primary ? theme.light : theme.secondaryLight};
  }
`

class App extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    const {active} = this.state
    return (
      <Wrapper>
        <Header data-foo='I should work'>
          <PageTitle>
            <Spinner {...{active}}>🔫</Spinner> Stiligita <Spinner {...{active}}>🌀</Spinner>
          </PageTitle>
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
