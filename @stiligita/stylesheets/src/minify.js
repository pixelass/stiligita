export default function (css) {
  return css
    .replace(/\s+/g, ' ') // Merge whitespaces
    .replace(/\s?([:;,{}()])\s?/g, '$1') // Remove extra whitespaces
    .replace(/;\}/g, '}') // Remove last semicolo in rule
}
