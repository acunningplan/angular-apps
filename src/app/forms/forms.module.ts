import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [
    FormsComponent
  ],
  providers: [],
  bootstrap: [FormsComponent]
})
export class FormsPracticeModule { }
