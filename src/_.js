import {omit as cleanObject} from 'lodash.omit'

export const filterObject = obj => {
  for (var i in obj) {
    if (!obj[i]) {
      delete obj[i];
    }
  }
  return obj
}

export const notListener = _ => {
  const [o, n, C] = _
  return !(o === 'o' && n === 'n' & C === C.toUpperCase())
}

export {cleanObject}
