import { Component, Input, OnInit } from "@angular/core";
import { TripCardPreview } from "../trip-card.model";

@Component({
  selector: "app-trip-card-preview",
  templateUrl: "./trip-card-preview.component.html",
  styleUrls: ["./trip-card-preview.component.css"]
})
export class TripCardPreviewComponent implements OnInit {
  @Input() tripCard: TripCardPreview;
  isOpaque = false;

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.isOpaque = true;
    console.log("clicked");
  }
}
