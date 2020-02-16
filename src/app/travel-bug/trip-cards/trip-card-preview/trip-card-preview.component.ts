import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TripCardPreview } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { Router } from "@angular/router";
import { IUserData } from "../../auth/models";
import { Subscription, Subject } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-trip-card-preview",
  templateUrl: "./trip-card-preview.component.html",
  styleUrls: ["./trip-card-preview.component.css"]
})
export class TripCardPreviewComponent implements OnInit, OnDestroy {
  @Input() tripCard: TripCardPreview;
  isOpaque = false;
  username = "";
  editable = false;
  authSub: Subscription;

  constructor(
    private tripCardsService: TripCardsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authSub = this.authService.user.subscribe(user => {
      this.username = user.username;
      if (this.username === this.tripCard.author.appUserId) {
        this.editable = true;
      }
    });
  }

  onStartEdit() {
    this.router.navigate([`trip-cards/edit/${this.tripCard.id}`]);
  }

  onDelete() {
    this.isOpaque = true;
    this.tripCardsService.deleteTripCard(this.tripCard.id);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
