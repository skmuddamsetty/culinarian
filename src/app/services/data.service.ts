import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private _recipes = new BehaviorSubject([]);

  getRecipes() {
    return this._recipes.asObservable();
  }

  setRecipes(interviews: Recipe[]) {
    this._recipes.next(interviews);
  }
}
