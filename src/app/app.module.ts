import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CockpitComponent } from "./servers/cockpit/cockpit.component";
import { ServerElementComponent } from "./servers/server-element/server-element.component";
import { GameComponent } from "./game/game.component";
import { GameControlComponent } from "./game/game-control/game-control.component";
import { OddComponent } from "./game/odd/odd.component";
import { EvenComponent } from "./game/even/even.component";
import { DisplayDetailsComponent } from "./display-details/display-details.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ServersComponent } from "./servers/servers.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { NumbersComponent } from "./numbers/numbers.component";
import { BasicHightlightDirective } from "./numbers/basic-highlight/basic-highlight.directive";
import { BetterHighlightDirective } from "./numbers/better-highlight/better-highlight.directive";
import { UnlessDirective } from "./shared/unless.directive";
import { DropdownDirective } from "./shared/dropdown.directive";
import { AccountsComponent } from "./accounts/accounts.component";
import { AccountComponent } from "./accounts/account/account.component";
import { NewAccountComponent } from "./accounts/new-account/new-account.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AppComponent,
    CockpitComponent,
    ServerElementComponent,
    GameComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    DisplayDetailsComponent,
    ServersComponent,
    NumbersComponent,
    BasicHightlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    AccountsComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
