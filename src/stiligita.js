import {createElement} from 'react'
import {cleanObject} from './_'
import {NAMESPACE} from './constants'
import getInvalid from './get-invalid-attributes'

const Stiligita = props => createElement(props.tag, {...cleanObject(props, getInvalid(props)), [`data-${NAMESPACE}`]: props.stiligitaId})

export default Stiligita
