import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeService } from "./recipe.service";
import { RecipesHomeComponent } from './recipes-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesHomeComponent,
    RecipeEditComponent
  ],
  exports: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesHomeComponent,
    RecipeEditComponent
  ],
  imports: [BrowserModule, FormsModule, RecipesRoutingModule],
  providers: [RecipeService],
  bootstrap: [RecipesComponent]
})
export class RecipesModule {}
