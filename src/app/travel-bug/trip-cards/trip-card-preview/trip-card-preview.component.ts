import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TripCardPreview } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

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
  subs: Subscription[] = [];

  constructor(
    private tripCardsService: TripCardsService,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.AuthService.user.subscribe(user => {
        this.username = user.username;
      })
    );

    if (
      this.tripCard &&
      this.tripCard.author &&
      this.tripCard.author.appUserId === this.username
    ) {
      this.editable = true;
    }
  }

  onStartEdit() {
    this.router.navigate([`trip-cards/edit/${this.tripCard.id}`]);
  }

  onDelete() {
    this.isOpaque = true;
    this.tripCardsService.deleteTripCard(this.tripCard.id);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
