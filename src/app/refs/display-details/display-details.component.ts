import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-display-details",
  templateUrl: "./display-details.component.html",
  styleUrls: ["./display-details.component.css"]
})
export class DisplayDetailsComponent implements OnInit {
  hidden: boolean = false;
  items: number[] = [];

  constructor() {}

  ngOnInit() {}

  toggleDisplay() {
    this.hidden = !this.hidden;
    this.items.push(this.items.length);
  }
}
