import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output() selectRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "A test recipe",
      "Recipe description goes here",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg"
    ),
    new Recipe(
      "Second recipe",
      "Recipe description goes here",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg"
    )
  ];

  constructor() {}

  ngOnInit() {}

  onSelectRecipe(recipe: Recipe) {
    this.selectRecipe.emit(recipe);
  }
}
