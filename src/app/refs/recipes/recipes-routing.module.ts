import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesHomeComponent } from "./recipes-home.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { AuthGuard } from "../auth/auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipesHomeComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":recipe-path/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":recipe-path",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
