import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpTestComponent } from './http-test.component';

@NgModule({
  declarations: [HttpTestComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  exports: [HttpTestComponent],
  bootstrap: [HttpTestComponent]
})
export class HttpTestModule {}
