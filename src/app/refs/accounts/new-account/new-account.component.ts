import { Component, EventEmitter, Output } from "@angular/core";
import { LoggingService } from "src/app/shared/logging.service";
import { AccountsDataService } from "src/app/shared/accounts-data.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"]
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountsDataService: AccountsDataService
  ) {
    this.accountsDataService.statusUpdated.subscribe(
      (status: string) => alert('New status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsDataService.addAccount(accountName, accountStatus);
  }
}
