import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { TripCard } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-trip-card",
  templateUrl: "./add-trip-card.component.html",
  styleUrls: ["./add-trip-card.component.css"]
})
export class AddTripCardComponent implements OnInit, OnDestroy {
  tripCardId: number;
  subscription: Subscription;
  submitting: boolean;

  signupForm: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;

  constructor(
    private tripCardsService: TripCardsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      imageUrl: new FormControl()
    });

    this.name = this.signupForm.get("name");
    this.description = this.signupForm.get("description");
    this.imageUrl = this.signupForm.get("imageUrl");
    this.subscription = this.tripCardsService.submitting.subscribe(
      submitting => {
        this.submitting = submitting;
      }
    );
  }

  onSubmit() {
    let tripCard: TripCard = {
      date: new Date(),
      name: this.name.value,
      description: this.description.value
      // pointsOfInterest: []
    };

    console.log(tripCard);

    this.tripCardsService.addTripCard(tripCard);
    // this.router.navigate(["/trip-cards"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
