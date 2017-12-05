import Abcq from 'abcq'
import uuid from 'uuid/v4'

export const hashCode = (s) =>{
  return s.split('').reduce((a,b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}

export const shortid = new Abcq()

export const scopedName = (id = uuid(), suffix = '') => {
  return shortid.encode(Math.abs(hashCode(id + suffix)))
}

export {uuid}
