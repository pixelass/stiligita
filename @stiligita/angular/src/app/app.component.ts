import {Component} from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button ghost-button="true">Ghostly Ghost</button>
      <button ghost-button active="true">Active Ghost</button>
      <button ghost-button>Default Ghost</button>
      <fancy-button>Fancy fancy</fancy-button>
    </div>
  `
})

export class AppComponent {
  title = 'app'
}
