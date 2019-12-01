import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BasicHightlightDirective } from "./basic-highlight/basic-highlight.directive";
import { BetterHighlightDirective } from "./better-highlight/better-highlight.directive";
import { NumbersComponent } from "./numbers.component";

@NgModule({
  declarations: [
    NumbersComponent,
    BasicHightlightDirective,
    BetterHighlightDirective
  ],
  exports: [
    NumbersComponent,
    BasicHightlightDirective,
    BetterHighlightDirective
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [NumbersComponent]
})
export class NumbersModule {}
