# stiligita


## Really just a prototype.


Similar to [styled-components](https://github.com/styled-components/styled-components)

```jsx

import React, {Component} from 'react'
import {render} from 'react-dom'
import styled from 'stiligita'

const Header = styled.header`
  padding: 3em 5em;
  background: ${_ => _.active ? 'blue' : 'red'};
  color: white;
  transition: background 1s;

  &:hover {
    background: ${_ => _.active ? 'green' : 'purple'};
  }
`

const Footer = styled.footer`
padding: 2em;
  ${p => p.dark ? `
    background: black;
    color: white;
  ` : `
    background: yellow;
    color: #444;
  `}
`

const Img = styled.img`
  width: ${p => p.imageWidth || 400}px
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
        </Header>
        <Footer dark>Footer</Footer>
        <Footer>Footer</Footer>
        <Img src='//placehold.it/800' imageWidth={100}/>
        <Img src='//placehold.it/800' imageWidth={100}/>
        <Img src='//placehold.it/800' imageWidth={200}/>
        <Img src='//placehold.it/800' imageWidth={200}/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
```
