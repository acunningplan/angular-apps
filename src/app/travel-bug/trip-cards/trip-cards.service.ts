import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TripCard } from "./trip-card.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TripCardsService {
  tripCardsChanged = new Subject<TripCard[]>();
  submitting = new Subject<boolean>();
  private tripCards: TripCard[] = [];
  private randomList: any;

  constructor(private http: HttpClient) {}

  setTripCards(tripCards: TripCard[]) {
    this.tripCards = tripCards;
    this.tripCardsChanged.next([...this.tripCards]);
  }

  fetchTripCards() {
    this.http
      .get(`http://localhost:5000/api/tripcards/`)
      .subscribe((res: any) => {
        this.tripCards = Array.from(res);
        this.tripCardsChanged.next([...this.tripCards]);
      });
    return [...this.tripCards];
  }

  getTripCards() {
    return [...this.tripCards];
  }

  getTripCard(id: number) {
    return this.tripCards[id];
  }

  addTripCard(newTripCard: TripCard) {
    this.submitting.next(true);

    this.http
      .post(`http://localhost:5000/api/tripcards/`, newTripCard)
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards.push(newTripCard);
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }

  editTripCard(id: number, newTripCard: TripCard) {
    this.submitting.next(true);
    this.http
      .put(`http://localhost:5000/api/tripcards/${id}`, {
        tripCard: newTripCard
      })
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards[id] = newTripCard;
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }

  deleteTripCard(id: string) {
    this.submitting.next(true);
    this.http
      .delete(`http://localhost:5000/api/tripcards/${id}`)
      .subscribe(res => {
        this.submitting.next(false);
        this.tripCards = this.tripCards.filter(tripCard => tripCard.id !== id);
        this.tripCardsChanged.next([...this.tripCards]);
      });
  }
}
