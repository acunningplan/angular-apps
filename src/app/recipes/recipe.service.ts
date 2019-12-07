import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Delicious Fettuccine",
      "Recipe description goes here",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg",
      [new Ingredient("Meat", 1), new Ingredient("Potato", 3)]
    ),
    new Recipe(
      "Pepperoni Pizza",
      "Recipe description goes here",
      "https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/1548964409/quesadizzas-FT-RECIPE0319.jpg?itok=utTcRHNM",
      [new Ingredient("Bread", 2), new Ingredient("Tomatoes", 3)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipe(recipePath: string) {
    return this.recipes.find(recipe => recipe.path === recipePath);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(path: string, newRecipe: Recipe) {
    const newRecipes = this.recipes.map(recipe =>
      recipe.path === path ? newRecipe : recipe
    );
    this.recipes = newRecipes;
    this.recipesChanged.next(newRecipes);
  }

  deleteRecipe(path: string) {
    const newRecipes = this.recipes.filter(recipe => recipe.path !== path);
    this.recipes = newRecipes;
    this.recipesChanged.next(newRecipes);
  }
}
