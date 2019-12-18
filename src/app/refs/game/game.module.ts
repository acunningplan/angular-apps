import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GameControlComponent } from "./game-control/game-control.component";
import { OddComponent } from "./odd/odd.component";
import { EvenComponent } from "./even/even.component";
import { GameComponent } from "./game.component";

@NgModule({
  declarations: [
    GameComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent
  ],
  exports: [GameComponent, GameControlComponent, OddComponent, EvenComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [GameComponent]
})
export class GameModule {}
