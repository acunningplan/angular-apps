import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public description: string;

  constructor(
    public name: string,
    desc: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
