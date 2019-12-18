import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormArray,
  Form,
  Validators
} from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipe.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipePath: string;
  editMode: boolean = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipePath = params["recipe-path"];
      this.editMode = params["recipe-path"] ? true : false;
      this.initForm();
    });
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  ngOnDestroy() {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  ingredientObject(ing: Ingredient) {
    return new FormGroup({
      name: new FormControl(ing.name, Validators.required),
      amount: new FormControl(ing.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      this.ingredientObject(new Ingredient())
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let recipe: Recipe;

    if (this.editMode) {
      // recipe = this.recipeService.getRecipe(this.recipePath);
      this.storeSub = this.store
        .select("recipes")
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find(
              (recipe, index) => recipe.path === this.recipePath
            );
          })
        )
        .subscribe(recipe => {
          this.recipeForm = new FormGroup({
            name: new FormControl(
              recipe ? recipe.name : "",
              Validators.required
            ),
            imagePath: new FormControl(
              recipe ? recipe.imagePath : "",
              Validators.required
            ),
            description: new FormControl(
              recipe ? recipe.description : "",
              Validators.required
            ),
            ingredients: new FormArray(
              recipe
                ? recipe.ingredients.map(ing => this.ingredientObject(ing))
                : []
            )
          });
        });
    }
  }

  // ingredients: new FormArray(recipe ? <FormArray>recipe.ingredients.map(ing => new FormControl(ing)) : <FormArray>[])
  onSubmit() {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;
    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.recipePath, newRecipe);
      // this.router.navigate(["/recipes/", newRecipe.path]);
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          recipePath: this.recipePath,
          newRecipe: this.recipeForm.value
        })
      );
    } else {
      // this.recipeService.addRecipe(newRecipe);
      // this.onCancel();
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
  }
}
