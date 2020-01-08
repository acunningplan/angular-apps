import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TravelBugComponent } from "./travel-bug.component";
import { GreetComponent } from "./greet/greet.component";
import { HeaderComponent } from "./header/header.component";
import { Routes, RouterModule } from "@angular/router";
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripFormComponent } from './trip-form/trip-form.component';

const appRoutes: Routes = [{ path: "asdf", component: HeaderComponent }];

@NgModule({
  declarations: [TravelBugComponent, GreetComponent, HeaderComponent, TripCardComponent, TripFormComponent],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [TravelBugComponent, RouterModule]
})
export class TravelBugModule {}
