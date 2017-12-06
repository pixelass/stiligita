import styled from '../src'

const APP = document.getElementById('app')

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

APP.appendChild(Wrapper({children: Header({children: 'Stiligita'})}))
