import { Injectable } from '@angular/core';
import { Recipe, RecipeId } from '../models/recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private _recipes = new BehaviorSubject([]);
  private _selectedRecipe: BehaviorSubject<any> = new BehaviorSubject('');

  getRecipes() {
    return this._recipes.asObservable();
  }

  setRecipes(interviews: Recipe[]) {
    this._recipes.next(interviews);
  }

  getSelectedRecipe() {
    return this._selectedRecipe.asObservable();
  }

  setSelectedRecipe(recipe: RecipeId) {
    this._selectedRecipe.next(recipe);
  }
}
