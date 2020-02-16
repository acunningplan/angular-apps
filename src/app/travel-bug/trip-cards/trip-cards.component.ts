import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TripCardsService } from "./trip-cards.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TripCard, TripCardPreview } from "./trip-card.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-trip-cards",
  templateUrl: "./trip-cards.component.html",
  styleUrls: ["./trip-cards.component.css"]
})
export class TripCardsComponent implements OnInit, OnDestroy {
  submitting: boolean;
  tripCards: TripCard[] = [];
  subscription: Subscription;

  constructor(
    private tripCardsService: TripCardsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tripCards = this.tripCardsService.fetchTripCards();
    this.subscription = this.tripCardsService.tripCardsChanged.subscribe(
      res => {
        this.tripCards = res;
      }
    );
  }

  onAddTripCard() {
    this.router.navigate(["add"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
