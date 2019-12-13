import { Effect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import * as RecipesActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducer"
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(fetchAction => {
      return this.http.get<Recipe[]>(
        "https://ng-recipez.firebaseio.com/recipes.json"
        // user ? this.appendToken(user.token) : {}
      );
    }),

    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES), 
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
    return this.http.put(
      "https://ng-recipez.firebaseio.com/recipes.json",
      recipesState.recipes
    );
  }))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
