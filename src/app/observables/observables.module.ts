import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ObservablesComponent } from './observables.component';
import { OHComponent } from './home/home.component';
import { OUComponent } from './user/user.component';
import { ObservablesRoutingModule } from './observables-routing.module';

@NgModule({
  declarations: [
    ObservablesComponent,
    OHComponent,
    OUComponent
  ],
  imports: [
    BrowserModule,
    ObservablesRoutingModule
  ],
  exports: [
    ObservablesComponent,
    OHComponent,
    OUComponent
  ],
  providers: [],
  bootstrap: [ObservablesComponent]
})
export class ObservablesModule { }
