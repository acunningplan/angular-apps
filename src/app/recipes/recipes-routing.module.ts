import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesHomeComponent } from "./recipes-home.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

// const appRoutes: Routes = [
//   { path: "recipes/2", component: RecipesHomeComponent },
//   { path: "recipes/:recipe-name", component: RecipeDetailComponent }
// ];

const appRoutes: Routes = [
  {
    path: "recipes",
    component: RecipesComponent,
    children: [
      { path: "", component: RecipesHomeComponent },
      { path: "new", component: RecipeEditComponent },
      { path: ":recipe-name/edit", component: RecipeEditComponent },
      { path: ":recipe-name", component: RecipeDetailComponent },
    ]
  }
  // { path: "**", redirectTo: "/recipes" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
