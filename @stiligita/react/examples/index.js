import React, {Component} from 'react'
import {render} from 'react-dom'
import Stylis from 'stylis'
import styled from '@stiligita/core'
import {PROCESSOR} from '@stiligita/constants'
import react from '../lib'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

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

styled
  .before(sortCSSProps)
  .use(react)

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

class App extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <Wrapper>
        <PageTitle>
          Reusing selectors!
        </PageTitle>
        <SecondTitle>
          Reusing selectors!
        </SecondTitle>
      </Wrapper>
    )
  }
}

render(<App/>, document.getElementById('app'))
