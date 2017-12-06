import {createElement} from 'react'
import {cleanObject} from './_'
import {NAMESPACE} from './constants'
import getInvalid from './get-invalid-attributes'

export default function Stiligita(props){return createElement(props.tag, {...cleanObject(props, getInvalid(props)), [`data-${NAMESPACE}`]: props.sid})}
