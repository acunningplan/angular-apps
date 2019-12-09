import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesHomeComponent } from './recipes/recipes-home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';


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
