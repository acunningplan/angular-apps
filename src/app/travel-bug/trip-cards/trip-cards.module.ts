import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardsComponent } from './trip-cards.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TripCardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TripCardsModule { }
