export const isListener = onEvent => {
  const [o, n, Event] = onEvent
  return o === 'o' && n === 'n' & Event === Event.toUpperCase()
}

export const isTruthy = (input, reject = [undefined, null, false]) => reject.indexOf(input) < 0

export const isFalsy = (input, reject = [undefined, null, false]) => !isTruthy(input, reject)

export const ensureTruthy = (input, fallback = '', reject = [undefined, null, false]) =>
  isFalsy(input, reject) ? fallback : input

export const filterObject = obj => Object.keys(obj)
  .filter(key => isTruthy(obj[key]))
  .map(prop => ({[prop]: obj[prop]}))
  .reduce((a, b) => ({...a, ...b}), {})

export const cleanObject = (obj, removals) => Object.keys(obj)
  .filter(key => isTruthy(key, removals))
  .map(prop => ({[prop]: obj[prop]}))
  .reduce((a, b) => ({...a, ...b}), {})

