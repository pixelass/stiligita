/**
 * Determines if listener.
 *
 * @param {string} onEvent  eventname
 * @return {boolean} True if listener, False otherwise.
 */
export const isListener = onEvent => {
  const [o, n, Event] = onEvent
  return o === 'o' && n === 'n' & Event === Event.toUpperCase()
}
