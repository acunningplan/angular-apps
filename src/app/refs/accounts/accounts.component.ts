import { Component, OnInit } from "@angular/core";
import { AccountsDataService } from '../shared/accounts-data.service';

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];

  constructor(private accountsService: AccountsDataService) {

  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
