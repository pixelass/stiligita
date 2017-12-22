import React, {Component} from 'react'
import {render} from 'react-dom'
import Stylis from 'stylis'
import styled from '@stiligita/core'
import keyframes from '@stiligita/keyframes'
import {PROCESSOR, GET_NAME} from '@stiligita/constants'
import Abcq from 'abcq'
import react from '../lib'

const shortid = new Abcq()
const shortId = (key, keys) => {
  // A console.log(key, keys)
  return shortid.encode(keys.indexOf(key))
}
shortId.stiligita = GET_NAME

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
  .use(shortId)

const spin = keyframes`to{transform:rotate(1turn)}`

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

const Spinner = styled.svg`
  font-size: 5em;
  height: 1em;
  width: 1em;
  animation: ${spin} 2s infinite;
`

const Rect = styled.rect`
  fill: green;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Spinner viewBox='0 0 100 100'>
          <Rect y='25' x='25' height='50' width='50'/>
        </Spinner>
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
