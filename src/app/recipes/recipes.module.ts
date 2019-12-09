import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesHomeComponent } from "./recipes-home.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipesHomeComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ],
  providers: [],
  bootstrap: [RecipesComponent]
})
export class RecipesModule {}
