const ensureSelector = selector => selector[0].match(/[\-0-9]/) ? `_${selector}` : selector

export const hashCode = str => ensureSelector(Math.abs(str.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)).toString(36))
