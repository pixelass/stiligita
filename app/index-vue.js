import Vue from 'vue'
import styled from '../src/packages/stiligita'
import renderVue from '../src/packages/stiligita-vue'

styled
  .use(renderVue)


const app = new Vue({
  el: '#app',
  data: {
    message: 'Stiligita & Vue.js'
  }
})

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

const App = {
  name: 'Stiligita Vue',
  render: createElement => (
    <div id="foo">
      <foo-bar>foofoo</foo-bar>
    </div>
  )
}


new Vue({
  render: createElement => createElement(App)
}).$mount('#foo')
