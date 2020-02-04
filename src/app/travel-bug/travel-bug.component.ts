import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-travel-bug",
  templateUrl: "./travel-bug.component.html",
  styleUrls: ["./travel-bug.component.css"]
})
export class TravelBugComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  onClick() {
    console.log("You clicked to add a trip card.");
  }
}
