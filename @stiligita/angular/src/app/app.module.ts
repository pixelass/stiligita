import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component'

// Import 2 variants (directive & component).
// The transplier options are defined in each component
// ghost-button is a directive.
// It allows nested styles and adds vendor-prefixes
import GhostButton from '../components/ghost-button'
// ghost-button is a component.
// It does not allow nested styles or add vendor-prefixes
import FancyButton from '../components/fancy-button'

@NgModule({
  declarations: [
    AppComponent,
    GhostButton,
    FancyButton
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
