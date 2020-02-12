import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { IUserData } from "../auth/models";

@Component({
  selector: "app-greet",
  templateUrl: "./greet.component.html",
  styleUrls: ["./greet.component.css"]
})
export class GreetComponent implements OnInit, OnDestroy {
  displayName = "Guest";

  constructor() {}

  ngOnInit() {
    const userData: IUserData = JSON.parse(localStorage.getItem("userData"));
    this.displayName = userData.displayName;
  }

  ngOnDestroy() {}
}
