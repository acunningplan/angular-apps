import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownDirective } from "./dropdown.directive";
import { UnlessDirective } from "./unless.directive";
import { AccountsDataService } from "./accounts-data.service";
import { LoggingService } from "./logging.service";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DropdownDirective,
    UnlessDirective,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    [
      DropdownDirective,
      UnlessDirective,
      AlertComponent,
      LoadingSpinnerComponent,
      PlaceholderDirective
    ]
  ],
  providers: [AccountsDataService, LoggingService],
  bootstrap: [],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
