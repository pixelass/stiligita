import {store} from '@stiligita/store'
import hashCode from '@stiligita/hash-code';
import {NAMESPACE, CREATE_COMPONENT} from '@stiligita/constants';
import {templateWithProps} from '@stiligita/templates'
import {Component, Directive, ElementRef, Input} from '@angular/core';


const assignStyled = (strings, args, props = {}) => {
  const css = templateWithProps(strings, args, props)
  const hash = hashCode(css)
  return {css, hash}
}

const createAngularComponent = (tag, hash, {selector}) => {
  @Component({
    selector,
    template: `<${tag} data-${NAMESPACE}="${hash}"><ng-content></ng-content></${tag}>`
  })
  class StyledComponent {}
  return StyledComponent
}

const createAngularDirective = (tag, hash, {selector}) => {
  @Directive({
    selector: `[${selector}]`
  })
  class StyledDirective {
    constructor(el: ElementRef) {
      el.nativeElement.setAttribute(`data-${NAMESPACE}`, hash);
    }

  }
  return StyledDirective
}

function createComponent (strings, args, tag, defaultProps) {
  const {css, hash} = assignStyled(strings, args, defaultProps)
  store.addRules({[hash]: css})
  return createAngularComponent(tag, hash, defaultProps)
}

function createDirective (strings, args, tag, defaultProps) {
  const {css, hash} = assignStyled(strings, args, defaultProps)
  store.addRules({[hash]: css})
  return createAngularDirective(tag, hash, defaultProps)
}

namespace createComponent {
  export let stiligita = CREATE_COMPONENT
}

namespace createDirective {
  export let stiligita = CREATE_COMPONENT
}

export {createComponent, createDirective}
