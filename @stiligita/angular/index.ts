import {render} from '@stiligita/dom'
import {store} from '@stiligita/store'
import hashCode from '@stiligita/hash-code';
import {NAMESPACE, CREATE_COMPONENT, CREATE_SELECTOR} from '@stiligita/constants';
import {templateWithProps} from '@stiligita/templates'
import {Component, Directive} from '@angular/core';

const assignStyled = (strings, args, props = {}) => {
  const css = templateWithProps(strings, args, props)
  const hash = hashCode(css)
  return {css, hash}
}

const createAngularComponent = (tag, hash, {selector}) => {
  const pair = render[CREATE_SELECTOR](hash, 'html');
  const key = Object.keys(pair)[0];
  @Component({
    selector,
    template: `
      <${tag} ${key}="${pair[key]}">
        <ng-content></ng-content>
      </${tag}>
    `
  })
  class StyledComponent {}
  return StyledComponent
}

const createAngularDirective = (tag, hash, {selector}) => {
  const key = Object.keys(render[CREATE_SELECTOR](hash, 'html'))[0];
  @Directive({
    selector: `[${selector}]`,
    host: {[`[attr.${key}]`]: 'styleHash'}
  })
  class StyledDirective {
    styleHash = hash
  }
  return StyledDirective
}

function createWithFunction (fn, {strings, args, tag, defaultProps}) {
  const {css, hash} = assignStyled(strings, args, defaultProps)
  store.addRules({[hash]: css})
  return fn(tag, hash, defaultProps)
}

function createComponent (strings, args, tag, defaultProps) {
  return createWithFunction(createAngularComponent, {strings, args, tag, defaultProps})
}

function createDirective (strings, args, tag, defaultProps) {
  return createWithFunction(createAngularDirective, {strings, args, tag, defaultProps})
}

namespace createComponent {
  export let stiligita = CREATE_COMPONENT
}

namespace createDirective {
  export let stiligita = CREATE_COMPONENT
}

export {createComponent, createDirective}
