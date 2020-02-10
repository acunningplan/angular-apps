import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TripCardPreview } from "../trip-card.model";
import { TripCardsService } from "../trip-cards.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-trip-card-preview",
  templateUrl: "./trip-card-preview.component.html",
  styleUrls: ["./trip-card-preview.component.css"]
})
export class TripCardPreviewComponent implements OnInit, OnDestroy {
  @Input() tripCard: TripCardPreview;
  isOpaque = false;

  constructor(
    private tripCardsService: TripCardsService,
    private router: Router
  ) {}

  ngOnInit() {}

  onStartEdit() {
    this.router.navigate([`trip-cards/edit/${this.tripCard.id}`]);
  }

  onDelete() {
    this.isOpaque = true;
    this.tripCardsService.deleteTripCard(this.tripCard.id);
  }

  ngOnDestroy() {}
}
