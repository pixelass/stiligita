export const htmlAttributes = {
  '*': [
    'about',
    'acceptCharset',
    'accessKey',
    'allowFullScreen',
    'allowTransparency',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'classID',
    'className',
    'colSpan',
    'contentEditable',
    'contextMenu',
    'crossOrigin',
    'dangerouslySetInnerHTML',
    'datatype',
    'dateTime',
    'dir',
    'draggable',
    'encType',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'hidden',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'icon',
    'id',
    'inlist',
    'inputMode',
    'is',
    'itemID',
    'itemProp',
    'itemRef',
    'itemScope',
    'itemType',
    'keyParams',
    'keyType',
    'lang',
    'marginHeight',
    'marginWidth',
    'maxLength',
    'mediaGroup',
    'minLength',
    'noValidate',
    'prefix',
    'property',
    'radioGroup',
    'readOnly',
    'resource',
    'role',
    'rowSpan',
    'scoped',
    'seamless',
    'security',
    'spellCheck',
    'srcDoc',
    'srcLang',
    'srcSet',
    'style',
    'suppressContentEditableWarning',
    'tabIndex',
    'title',
    'typeof',
    'unselectable',
    'useMap',
    'vocab',
    'wmode'
  ],
  'a': [
    'coords',
    'download',
    'href',
    'name',
    'rel',
    'shape',
    'target',
    'type'
  ],
  'abbr': [
    'title'
  ],
  'audio': [
    'controls',
    'loop',
    'muted',
    'preload',
    'src'
  ],
  'base': [
    'href',
    'target'
  ],
  'bdo': [
    'dir'
  ],
  'blockquote': [
    'cite'
  ],
  'button': [
    'disabled',
    'form',
    'name',
    'type',
    'value'
  ],
  'canvas': [
    'height',
    'width'
  ],
  'col': [
    'span',
    'width'
  ],
  'colgroup': [
    'span',
    'width'
  ],
  'data': [
    'value'
  ],
  'del': [
    'cite'
  ],
  'fieldset': [
    'disabled',
    'form',
    'name'
  ],
  'form': [
    'accept',
    'action',
    'method',
    'name',
    'target'
  ],
  'hr': [
    'size',
    'width'
  ],
  'iframe': [
    'height',
    'name',
    'sandbox',
    'scrolling',
    'src',
    'width'
  ],
  'img': [
    'alt',
    'height',
    'name',
    'sizes',
    'src',
    'width'
  ],
  'input': [
    'accept',
    'alt',
    'autoCapitalize',
    'autoCorrect',
    'autoSave',
    'checked',
    'defaultChecked',
    'defaultValue',
    'disabled',
    'form',
    'height',
    'list',
    'max',
    'min',
    'multiple',
    'name',
    'onChange',
    'pattern',
    'placeholder',
    'required',
    'results',
    'size',
    'src',
    'step',
    'title',
    'type',
    'value',
    'width'
  ],
  'label': [
    'form'
  ],
  'li': [
    'type',
    'value'
  ],
  'meta': [
    'content',
    'name'
  ],
  'ol': [
    'reversed',
    'start',
    'type'
  ],
  'optgroup': [
    'disabled',
    'label'
  ],
  'option': [
    'disabled',
    'label',
    'selected',
    'value'
  ],
  'pre': [
    'width'
  ],
  'progress': [
    'max',
    'value'
  ],
  'q': [
    'cite'
  ],
  'select': [
    'defaultValue',
    'disabled',
    'form',
    'multiple',
    'name',
    'onChange',
    'required',
    'size',
    'value'
  ],
  'source': [
    'media',
    'sizes',
    'src',
    'type'
  ],
  'table': [
    'summary',
    'width'
  ],
  'td': [
    'headers',
    'height',
    'scope',
    'width'
  ],
  'textarea': [
    'autoCapitalize',
    'autoCorrect',
    'cols',
    'defaultValue',
    'disabled',
    'form',
    'name',
    'onChange',
    'placeholder',
    'required',
    'rows',
    'value',
    'wrap'
  ],
  'th': [
    'headers',
    'height',
    'scope',
    'width'
  ],
  'ul': [
    'type'
  ],
  'video': [
    'controls',
    'height',
    'loop',
    'muted',
    'poster',
    'preload',
    'src',
    'width'
  ],
  'address': [],
  'article': [],
  'aside': [],
  'b': [],
  'bdi': [],
  'br': [],
  'caption': [],
  'cite': [],
  'code': [],
  'datalist': [],
  'dd': [],
  'div': [],
  'dl': [],
  'dt': [],
  'em': [],
  'figcaption': [],
  'figure': [],
  'footer': [],
  'h1': [],
  'h2': [],
  'h3': [],
  'h4': [],
  'h5': [],
  'h6': [],
  'header': [],
  'hgroup': [],
  'i': [],
  'legend': [],
  'main': [],
  'nav': [],
  'p': [],
  'picture': [],
  's': [],
  'section': [],
  'small': [],
  'span': [],
  'strong': [],
  'sub': [],
  'summary': [],
  'sup': [],
  'svg': [],
  'tbody': [],
  'tfoot': [],
  'thead': [],
  'tr': [],
  'u': [],
  'wbr': []
}

export default Object.keys(htmlAttributes).filter(x => x !== '*')