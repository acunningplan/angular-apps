import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap, exhaust } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  private appendToken(token) {
    return {
      params: new HttpParams().set("auth", token)
    };
  }

  private makeRequest() {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.authService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          return this.http.put(
            "https://ng-recipez.firebaseio.com/recipes.json",
            recipes,
            user ? this.appendToken(user.token) : {}
          );
          // .subscribe(res => {
          //   // console.log(res)
          // });
        })
      )
      .subscribe(() => {
        // ...
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          "https://ng-recipez.firebaseio.com/recipes.json",
          user ? this.appendToken(user.token) : {}
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
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );

    // return this.http
    //   .get<Recipe[]>("https://ng-recipez.firebaseio.com/recipes.json")
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : []
    //         };
    //       });
    //     }),
    //     tap(recipes => {
    //       this.recipesService.setRecipes(recipes);
    //     })
    //   );
  }
}
