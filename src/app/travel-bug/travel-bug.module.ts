import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TravelBugComponent } from "./travel-bug.component";
import { GreetComponent } from "./greet/greet.component";
import { HeaderComponent } from "./header/header.component";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { TripCardsComponent } from "./trip-cards/trip-cards.component";
import { AddTripCardComponent } from "./trip-cards/add-trip-card/add-trip-card.component";
import { EditTripCardComponent } from "./trip-cards/edit-trip-card/edit-trip-card.component";
import { TripCardComponent } from "./trip-cards/trip-card/trip-card.component";
import { TripCardDetailsComponent } from "./trip-cards/trip-card-details/trip-card-details.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent },
  {
    path: "trip-cards",
    canActivate: [AuthGuard],
    children: [
      { path: "", component: TripCardsComponent },
      { path: "add", component: AddTripCardComponent },
      { path: "edit", component: EditTripCardComponent },
      { path: "view/:id", component: TripCardDetailsComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent,
    TravelBugComponent,
    HomeComponent,
    GreetComponent,
    UsersComponent,
    TripCardsComponent,
    TripCardComponent,
    TripCardDetailsComponent,
    AddTripCardComponent,
    EditTripCardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    //   ShoppingListService,
    //   RecipeService,
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptorService,
    //     multi: true
    //   }
  ],
  exports: [TravelBugComponent, RouterModule]
})
export class TravelBugModule {}
