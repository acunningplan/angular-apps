import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TripCard } from "./trip-card.model";

@Injectable({
  providedIn: "root"
})
export class TripCardsService {
  tripCardsChanged = new Subject<TripCard[]>();
  private tripCards: TripCard[] = [];

  constructor() {}

  setTripCards(tripCards: TripCard[]) {
    this.tripCards = tripCards;
    this.tripCardsChanged.next([...this.tripCards]);
  }

  getTripCards() {
    return [...this.tripCards];
  }

  getTripCard(index: number) {
    return this.tripCards[index];
  }

  addTripCard(newTripCard: TripCard) {
    this.tripCards.push(newTripCard);
    this.tripCardsChanged.next([...this.tripCards]);
  }

  editTripCard(index: number, newTripCard: TripCard) {
    this.tripCards[index] = newTripCard;
    this.tripCardsChanged.next([...this.tripCards]);
  }

  deleteTripCard(index: number) {
    this.tripCards.splice(index, 1);
    this.tripCardsChanged.next([...this.tripCards]);
  }
}
