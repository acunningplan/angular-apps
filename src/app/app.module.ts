import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { ShoppingListService } from "./shopping-list/shopping-list.service";

import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { RoutingModule } from "./routing/routing.module";
import { SharedModule } from "./shared/shared.module";
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    GameModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
