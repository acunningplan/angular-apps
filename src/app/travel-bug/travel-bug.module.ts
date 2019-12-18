import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TravelBugComponent } from "./travel-bug.component";
import { GreetComponent } from './greet/greet.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [TravelBugComponent, GreetComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [TravelBugComponent]
})
export class TravelBugModule {}
