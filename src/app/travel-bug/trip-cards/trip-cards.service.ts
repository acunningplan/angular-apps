import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TripCard } from "./trip-card.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TripCardsService {
  tripCardsChanged = new Subject<TripCard[]>();
  selectedTripCardId: string;
  submitting = new Subject<boolean>();
  private tripCards: TripCard[] = [];

  constructor(private http: HttpClient) {}

  setTripCards(tripCards: TripCard[]) {
    this.tripCards = tripCards;
    this.tripCardsChanged.next([...this.tripCards]);
  }

  fetchTripCards() {
    this.http
      .get<TripCard[]>(`http://localhost:5000/api/tripcards/`)
      .subscribe(res => {
        this.tripCards = Array.from(res);
        this.tripCardsChanged.next([...this.tripCards]);
      });
    return [...this.tripCards];
  }

  resolveTripCards() {
    return this.http
      .get<TripCard[]>(`http://localhost:5000/api/tripcards/`)
      .pipe(
        tap(tripCards => {
          this.tripCards = Array.from(tripCards);
          this.tripCardsChanged.next([...this.tripCards]);
        })
      );
  }

  getTripCards() {
    return [...this.tripCards];
  }

  getTripCard(id: string) {
    return this.tripCards.find(tripCard => tripCard.id === id);
  }

  addTripCard(newTripCard: TripCard) {
    this.submitting.next(true);
    return this.http
      .post(`http://localhost:5000/api/tripcards/`, newTripCard)
      .pipe(
        tap(res => {
          this.submitting.next(false);
          this.tripCards.push(newTripCard);
          this.tripCardsChanged.next([...this.tripCards]);
        })
      );
  }

  editTripCard(id: string, newTripCard: TripCard) {
    this.submitting.next(true);
    return this.http
      .put(`http://localhost:5000/api/tripcards/${id}`, newTripCard)
      .pipe(
        tap(res => {
          this.submitting.next(false);
          this.tripCards = this.tripCards.map(tripCard => {
            return tripCard.id === id ? newTripCard : tripCard;
          });
          this.tripCardsChanged.next([...this.tripCards]);
        })
      );
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
