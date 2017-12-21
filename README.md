# 🔫 stiligita 🌀

Inspired by [styled-components](https://github.com/styled-components/styled-components).

## Really just a prototype.

> 🔫 Stiligita is styled components for everybody 🌀  

## Idea.

| Esperanto | English      | React.js          | Vue.js                | HTML            | Angular.js | ...?       |
| --------- | ------------ | ----------------- | --------------------- | --------------- | -----------| ---------- |
| stiligita | streamlined  | stiligita         | stiligita             | stiligita       | stiligita  | stiligita  |
|           | styled       | styled-components |                       |                 |            |            |
|           | stylized     |                   | vue-styled-components | styled-elements |            |            |   |


Stiligita does not intend to provide all features of "styled-components" but you can build these features if you need them.  
Need styled-componets in angular? Just add water (Angular) and stir (provide a wrapper).


## Vanilla

### It doesn't get easier than this.

```js
import styled from '@stiligita/core'

const Button = styled.button`
  background: black;
  color: white;
`
```

## `Stiligita.use()`

### Adding React

Stiligita allows you to choose a RenderEngine.

```js
import styled from '@stiligita/core'
import react from '@stiligita/react'

styled.use(react)

const Button = styled.button`
  background: black;
  color: white;
`
```


### Adding Vue

```js
import styled from '@stiligita/core'
import vue from '@stiligita/vue'

styled.use(vue)

const Button = styled.button`
  background: black;
  color: white;
`
```

### Adding Angular

```js
import styled from '@stiligita/core'
import {createDirective, createComponent} from '@stiligita/angular'

styled.use(createDirective)
// <button foo-button/>I am Foo</button>
// Or
// styled.use(createComponent)
// <foo-button/>I am Foo</foo-button>

const Button = styled('button', {
  selector: 'foo-button'
})`
  background: black;
  color: white;
`
```

### Nested css & prefixing

Stiligita allows you to choose a cssProcessor.

```js
import Stylis from 'stylis'
import styled from '@stiligita/core'
import keyframes from '@stiligita/keyframes'
import {PROCESSOR} from '@stiligita/constants'

// Keyframe needs to be set to false to prevent
// scoping the keyframe name
const stylis = new Stylis({keyframe: false})
// stiligita needs to know how to interpret this transpiler
stylis.stiligita = PROCESSOR

styled
  .use(stylis)

const spin = keyframes`to{transform: rotate(360deg)}`

const Button = styled.button`
  background: grey;
  color: white;

  &:hover {
    animation: ${spin} 1s infinite;
    background: black;
  }
`
```

### Sharable configuration

If you want to reuse a preconfiguration you might want to create a module.
You can still add scoped modifications later on.

```js
import Stylis from 'stylis'
import styled from '@stiligita/core'
import keyframes from '@stiligita/keyframes'
import {PROCESSOR} from '@stiligita/constants'

const stylis = new Stylis({keyframe: false})
stylis.stiligita = PROCESSOR

styled
  .use(stylis)

export default styled
```

© Copyright 2017 | Gregor Adams
