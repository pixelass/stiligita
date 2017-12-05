import React from 'react'
import {render} from 'react-dom'
import styled from '../src'

const Header = styled.header`
  background: red;
  color: green;
  transition: background 1s;

  &:hover {
    background: white;
  }
`

const Footer = styled.header`
padding: 2em;
background: #ccc;
${p => p.dark && `
  background: black;
  color: white;
`}
`


const Img = styled.img`
  width: ${p => p.imageWidth || 400}px
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
  <Img src='//placehold.it/800' imageWidth={100}/>
  <Img src='//placehold.it/800' imageWidth={200}/>
  <Img src='//placehold.it/800' imageWidth={300}/>
  <Img src='//placehold.it/800' imageWidth={400}/>
</div>
)

render(<App/>, document.getElementById('app'))
