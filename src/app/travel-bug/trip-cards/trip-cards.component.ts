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
  // tripCards: ITripCard[] = [
  //     {
  //         name: "Bristol",
  //         description: "The city of Bristol is located in South West England.",
  //         image: "https://i2-prod.bristolpost.co.uk/incoming/article1819542.ece/ALTERNATES/s615/0_MYR_BRI_240718BRistolUni_03JPG.jpg"
  //     },
  //     {
  //         name: "Vienna",
  //         description: "The city of Vienna is the capital and most populous city of Austria",
  //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh32M-VtHxrXW8K8cWNkmEN5lW716iSLY26dkrn1QpQR5kcnaP&s"
  //     },
  // ]
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
