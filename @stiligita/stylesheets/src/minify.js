export default function minifyCSS (css) {
  return css
    .replace(/\s+/g, ' ') // merge whitespaces
    .replace(/\s?([:;,{}()])\s?/g, '$1') // remove extra whitespaces
    .replace(/;\}/g, '}') // remove last semicolo in rule
}
