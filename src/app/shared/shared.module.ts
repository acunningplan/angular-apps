import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownDirective } from "./dropdown.directive";
import { UnlessDirective } from "./unless.directive";
import { AccountsDataService } from "./accounts-data.service";
import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [DropdownDirective, UnlessDirective],
  exports: [DropdownDirective, UnlessDirective],
  imports: [BrowserModule, FormsModule],
  providers: [AccountsDataService, LoggingService],
  bootstrap: []
})
export class SharedModule {}
