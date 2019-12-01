import { Component, Input } from "@angular/core";
import { LoggingService } from "src/app/shared/logging.service";
import { AccountsDataService } from "src/app/shared/accounts-data.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    private loggingService: LoggingService,
    private accountsDataService: AccountsDataService
  ) {}

  onSetTo(status: string) {
    this.accountsDataService.updateStatus(this.id, status);
    this.accountsDataService.statusUpdated.emit(status)
  }
}
