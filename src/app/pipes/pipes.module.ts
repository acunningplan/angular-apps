import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { PipesComponent } from './pipes.component';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    PipesComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [PipesComponent],
  providers: [],
  bootstrap: [PipesComponent]
})
export class PipesModule { }
