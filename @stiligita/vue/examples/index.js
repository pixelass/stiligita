import Vue from 'vue'
import Stylis from 'stylis'
import styled from '@stiligita/core'
import {keyframes} from '@stiligita/stylesheets'
import renderVue from '@stiligita/vue'
import {PROCESSOR} from '@stiligita/constants'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

styled
  .use(renderVue)
  .use(stylis)

const spin = keyframes`to {transform: rotate(360deg);}`

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

const Spinner = styled('span', {
  active: Boolean,
  reverse: Boolean
})`
  position: relative;
  display: inline-block;
  animation: ${spin} 2s linear infinite;
  animation-direction: ${props => props.reverse ? 'reverse' : 'normal'};
  animation-play-state: ${props => props.active ? 'playing' : 'paused'};
`

const Title = styled.h1`
  user-select: none;
  font-family: 'Comic Sans MS';
  font-size: 4em;
  margin: 0;
  text-align: center;
`

const Button = styled('button', {
  type: {
    type: String,
    required: true
  },
  primary: Boolean
})`
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

const STORAGE_KEY = 'stiligita-vue-1.0.0-0'
const appStore = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"active": false, "reverse": false}')
  },
  save: function (state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}


const App = {
  name: 'Example',
  data() {
    return {
      state: appStore.fetch()
    }
  },
  watch: {
    state: {
      handler: function (state) {
        appStore.save(state)
      },
      deep: true
    },
  },
  methods: {
    setState(state) {
      this.state = {...this.state, ...state}
    },
    toggleActive(e) {
      this.setState({active: !this.state.active})
    },
    toggleDirection(e) {
      this.setState({reverse: !this.state.reverse})
    }
  },
  render(h) {
    return (
      <Wrapper>
        <Header data-foo="I should work">
          <Title aria-label="I am Aria">
            <Spinner active={this.state.active}
                     reverse={this.state.reverse}>🔫</Spinner>
            Stiligita
            <Spinner active={this.state.active}
                     reverse={this.state.reverse}>🌀</Spinner>
          </Title>
        </Header>
        <main>
          <Button {...{on: {click: this.toggleActive}}}
                  type='button'
                  primary>
            {this.active ? 'Pause' : 'Play'}
          </Button>
          <Button {...{on: {click: this.toggleDirection}}}
                  type='button'>
            Switch direction
          </Button>
        </main>
        <Footer>© 2017 | Gregor Adams greg@pixelass.com</Footer>
      </Wrapper>
    )
  }
}


new Vue({
  render: createElement => createElement(App)
}).$mount('#app')
