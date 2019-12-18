import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipe.actions";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipePath: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  // Helper function for getting specific recipe
  getRecipeByPath(recipePath: string): Recipe {
    return this.recipeService
      .getRecipes()
      .find(recipe => recipe.path === recipePath);
  }

  ngOnInit() {
    const recipePath = this.route.snapshot.params["recipe-path"];
    // this.recipe = this.getRecipeByPath(recipePath);

    this.route.params
      .pipe(
        map(params => {
          return params["recipe-path"];
        }),
        switchMap(recipePath => {
          this.recipePath = recipePath;
          return this.store.select("recipes");
        }),
        map(recipesState => {
          return recipesState.recipes.find(
            (recipe, index) => recipe.name === recipePath
          );
        })
      )
      .subscribe(recipe => (this.recipe = recipe));
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipe.path);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipePath));
    this.router.navigate(["/recipes"]);
  }
}
