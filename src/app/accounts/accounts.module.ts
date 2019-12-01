import { NgModule } from "@angular/core";
import { AccountComponent } from "./account/account.component";
import { NewAccountComponent } from "./new-account/new-account.component";
import { AccountsComponent } from "./accounts.component";

@NgModule({
  declarations: [AccountsComponent, AccountComponent, NewAccountComponent],
  exports: [AccountsComponent, AccountComponent, NewAccountComponent],
  imports: [],
  providers: [],
  bootstrap: [AccountsComponent]
})
export class AccountsModule {}
