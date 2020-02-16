import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { TripCardsComponent } from "./trip-cards/trip-cards.component";
import { AddTripCardComponent } from "./trip-cards/add-trip-card/add-trip-card.component";
import { EditTripCardComponent } from "./trip-cards/edit-trip-card/edit-trip-card.component";
import { TripCardDetailsComponent } from "./trip-cards/trip-card-details/trip-card-details.component";
import { AuthComponent } from "./auth/auth.component";
import { TripCardsResolverService } from "./trip-cards/trip-cards-resolver.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent },
  {
    path: "trip-cards",
    resolve: [TripCardsResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: "", component: TripCardsComponent },
      { path: "add", component: AddTripCardComponent },
      {
        path: "edit/:id",
        component: EditTripCardComponent,
        resolve: [TripCardsResolverService]
      },
      { path: "view/:id", component: TripCardDetailsComponent }
    ]
  },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    //   ShoppingListService,
    //   RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class TravelBugRoutingModule {}
