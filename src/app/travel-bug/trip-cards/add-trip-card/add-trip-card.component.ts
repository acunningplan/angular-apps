import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { TripCard, INewTripCard } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IUserData } from "../../auth/models";

@Component({
  selector: "app-add-trip-card",
  templateUrl: "./add-trip-card.component.html",
  styleUrls: ["./add-trip-card.component.css"]
})
export class AddTripCardComponent implements OnInit, OnDestroy {
  tripCardId: number;
  submitting: boolean;
  signupForm: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;

  subs: Subscription[] = [];

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
    this.subs.push(
      this.tripCardsService.submitting.subscribe(submitting => {
        this.submitting = submitting;
      })
    );
  }

  onSubmit() {
    const userData: IUserData = JSON.parse(localStorage.getItem("userData"));

    const tripCard: TripCard = {
      date: new Date(),
      name: this.name.value,
      description: this.description.value,
      imageUrl: this.imageUrl.value,
      author: {
        appUserId: userData._username,
        displayName: userData.displayName,
        mainPhotoUrl: userData.imageUrl
      }
    };

    this.subs.push(
      this.tripCardsService
        .addTripCard(tripCard)
        .subscribe(res => this.router.navigate(["/trip-cards"]))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
