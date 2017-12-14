import styled from '@stiligita/core'
import {PROCESSOR} from '@stiligita/constants'
import * as Stylis from 'stylis'
import {createDirective} from '../../'

const processor: any = new Stylis({keyframe: false})
processor.stiligita = PROCESSOR

styled
  .use(createDirective)
  .use(processor)

export default styled('button', {
  selector: 'ghost-button'
})`
  padding: 0.5em 1em;
  border: 1px solid #004080;
  background: none;
  color: #004080;
  border-radius: 3px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background: #004080;
    color: #fff;
  }
`
