import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Helper function for getting specific recipe
  getRecipeByName(recipeName: string): Recipe {
    return this.recipeService
      .getRecipes()
      .find(recipe => recipe.name === recipeName);
  }

  ngOnInit() {
    const recipeName = this.route.snapshot.params["recipe-name"];
    this.recipe = this.getRecipeByName(recipeName);

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.getRecipeByName(params["recipe-name"]);
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
