import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { TripCard } from "./trip-card.model";
import { TripCardsService } from "./trip-cards.service";

@Injectable({
  providedIn: "root"
})
export class TripCardsResolverService implements Resolve<TripCard[]> {
  constructor(private tripCardsService: TripCardsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.tripCardsService.resolveTripCards();
  }
}
