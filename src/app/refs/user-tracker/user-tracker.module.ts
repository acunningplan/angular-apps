import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActiveUsersComponent } from "./active-users/active-users.component";
import { InactiveUsersComponent } from "./inactive-users/inactive-users.component";
import { UserTrackerComponent } from "./user-tracker.component";

@NgModule({
  declarations: [
    UserTrackerComponent,
    ActiveUsersComponent,
    InactiveUsersComponent
  ],
  exports: [UserTrackerComponent, ActiveUsersComponent, InactiveUsersComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [UserTrackerComponent]
})
export class UserTrackerModule {}
