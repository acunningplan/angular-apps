import { Component, OnInit, OnDestroy } from "@angular/core";
import { IUserData } from "../auth/models";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-greet",
  templateUrl: "./greet.component.html",
  styleUrls: ["./greet.component.css"]
})
export class GreetComponent implements OnInit, OnDestroy {
  displayName: string;
  authSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.user.subscribe(user => {
      this.displayName = user ? user.displayName : "Guest";
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
