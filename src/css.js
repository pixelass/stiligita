import Stylis from 'stylis'
const ProcessCSS = new Stylis({keyframe: false, compress: false})

export const createStyleBlock = (rules, keyframes) => {
  const proccesedRules = Object.keys(rules).map(key => {
    return ProcessCSS(`.${key}`, rules[key])
  }).join('')
  const processedKeyframes = Object.keys(keyframes).map(key => {
    return ProcessCSS('', `@keyframes ${key} {${keyframes[key]}}`)
  }).join('')
  return [proccesedRules, processedKeyframes].join('')
}

export const createCSS = (strings, args, props) => strings.map((str, i) => {
    const dynamic = args[i] || ''
    let addon = dynamic
    if (typeof dynamic === 'function') {
      addon = dynamic(props) || ''
    }
    return `${str}${addon}`
  }).join('')
