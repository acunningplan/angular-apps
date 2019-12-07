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
  getRecipeByPath(recipePath: string): Recipe {
    return this.recipeService
      .getRecipes()
      .find(recipe => recipe.path === recipePath);
  }

  ngOnInit() {
    const recipePath = this.route.snapshot.params["recipe-path"];
    this.recipe = this.getRecipeByPath(recipePath);

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.getRecipeByPath(params["recipe-path"]);
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
  
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.path);
    this.router.navigate(['/recipes'])
  }
}
