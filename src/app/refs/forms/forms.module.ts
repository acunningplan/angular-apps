import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormsComponent } from "./forms.component";

@NgModule({
  declarations: [FormsComponent],
  imports: [
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormsComponent],
  providers: [],
  bootstrap: [FormsComponent]
})
export class FormsPracticeModule {}
