import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TripCard } from "./trip-card.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TripCardsService {
  tripCardsChanged = new Subject<TripCard[]>();
  submitting = new Subject<boolean>();
  private tripCards: TripCard[] = [];

  constructor(private http: HttpClient) {}

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
    this.submitting.next(true);
    this.http
      .post(`http://localhost:5000/api/tripcards/`, {
        tripCard: newTripCard
      })
      .pipe()
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards.push(newTripCard);
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }

  editTripCard(index: number, newTripCard: TripCard) {
    this.submitting.next(true);
    this.http
      .put(`http://localhost:5000/api/trip-cards/${index}`, {
        tripCard: newTripCard
      })
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards[index] = newTripCard;
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }

  deleteTripCard(index: number) {
    this.submitting.next(true);
    this.http
      .delete(`http://localhost:5000/api/trip-cards/${index}`)
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards.splice(index, 1);
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }
}
