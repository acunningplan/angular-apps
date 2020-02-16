import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { TripCard } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IUserData } from "../../auth/models";

@Component({
  selector: "app-edit-trip-card",
  templateUrl: "./edit-trip-card.component.html",
  styleUrls: ["./edit-trip-card.component.css"]
})
export class EditTripCardComponent implements OnInit, OnDestroy {
  tripCard: TripCard;
  tripCardId: string;
  tripCards: TripCard[];
  signupForm: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;
  submitting: boolean;

  subs: Subscription[] = [];

  constructor(
    private tripCardsService: TripCardsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      // date: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      imageUrl: new FormControl()
    });

    this.name = this.signupForm.get("name");
    this.description = this.signupForm.get("description");
    this.imageUrl = this.signupForm.get("imageUrl");

    this.tripCards = this.tripCardsService.getTripCards();

    this.route.params.subscribe((params: Params) => {
      // this.tripCard = this.tripCardsService.getTripCard(this.tripCardId);

      this.tripCardId = params["id"];
      this.tripCard = this.tripCards.find(
        tripCard => tripCard.id == params["id"]
      );

      this.signupForm.patchValue({
        name: this.tripCard.name,
        description: this.tripCard.description,
        imageUrl: this.tripCard.imageUrl
      });
    });
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
        .editTripCard(this.tripCardId, tripCard)
        .subscribe(res => this.router.navigate(["/trip-cards"]))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
