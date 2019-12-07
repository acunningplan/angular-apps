import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { ShoppingListService } from "./shopping-list/shopping-list.service";

import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { DropdownDirective } from "./shared/dropdown.directive";
import { FormsPracticeModule } from "./forms/forms.module";
import { RecipeService } from "./recipes/recipe.service";
import { PipesModule } from "./pipes/pipes.module";
import { HttpTestModule } from "./http-test/http-test.module";

@NgModule({
  declarations: [HeaderComponent, AppComponent, DropdownDirective],
  imports: [
    BrowserModule,
    FormsModule,
    // RecipesModule,
    // ShoppingListModule,
    // SharedModule,
    // AppRoutingModule,
    // PipesModule
    HttpTestModule
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
