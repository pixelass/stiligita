import styled from '@stiligita/core'
import {createComponent} from '../../'

styled
  .use(createComponent)

export default styled('button', {
  selector: 'fancy-button'
})`
  padding: 0.5em 1em;
  border: 1px solid #004080;
  background: linear-gradient(to top, hsl(0, 70%, 70%), hsl(60, 70%, 70%), hsl(120, 70%, 70%), hsl(180, 70%, 70%), hsl(240, 70%, 70%), hsl(300, 70%, 70%));
  color: #000;
  border-radius: 3px;
  font-size: 1em;
  cursor: pointer;
`
