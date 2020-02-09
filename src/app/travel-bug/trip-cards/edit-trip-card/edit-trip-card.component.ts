import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { TripCard } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-edit-trip-card",
  templateUrl: "./edit-trip-card.component.html",
  styleUrls: ["./edit-trip-card.component.css"]
})
export class EditTripCardComponent implements OnInit {
  tripCardId: number;
  signupForm: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  imageUrl: AbstractControl;

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

    this.route.params.subscribe((params: Params) => {
      this.tripCardId = +params["id"];
    });
  }

  onSubmit() {
    let tripCard: TripCard = {
      date: new Date(),
      name: this.name.value,
      description: this.description.value,
      pointsOfInterest: "",
      author: {
        appUserId: "",
        displayName: "",
        mainPhotoUrl: ""
      }
    };

    this.tripCardsService.editTripCard(this.tripCardId, tripCard);
    this.router.navigate(["/trip-cards"]);
  }
}
