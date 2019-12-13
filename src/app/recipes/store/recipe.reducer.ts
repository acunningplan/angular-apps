import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes.find(
          recipe => recipe.path === action.payload.recipePath
        ),
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes].map(recipe => {
        return recipe.path === action.payload.recipePath
          ? updatedRecipe
          : recipe;
      });
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return recipe.path !== action.payload;
        })
      };
    default:
      return state;
  }
}
