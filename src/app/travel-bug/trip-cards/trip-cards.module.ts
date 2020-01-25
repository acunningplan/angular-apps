import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardsComponent } from './trip-cards.component';
import { RouterModule } from '@angular/router';
import { TripCardDetailsComponent } from './trip-card-details/trip-card-details.component';



@NgModule({
  declarations: [
    TripCardsComponent,
    TripCardDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TripCardsModule { }
