import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "recipe1",
      "Recipe description goes here",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg",
      [new Ingredient("Meat", 1), new Ingredient("Potato", 3)]
    ),
    new Recipe(
      "recipe2",
      "Recipe description goes here",
      "https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/1548964409/quesadizzas-FT-RECIPE0319.jpg?itok=utTcRHNM",
      [new Ingredient("Bread", 2), new Ingredient("Tomatoes", 3)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
