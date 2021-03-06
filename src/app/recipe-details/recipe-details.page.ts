import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { RecipeId } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss']
})
export class RecipeDetailsPage implements OnInit, OnDestroy {
  selectedRecipeObservable: Observable<RecipeId>;
  selectedRecipeSubscription: Subscription;
  recipe: RecipeId;
  servingCount = 1;
  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.selectedRecipeObservable = this.dataService.getSelectedRecipe();
    this.selectedRecipeSubscription = this.selectedRecipeObservable.subscribe(
      recipe => {
        this.recipe = recipe;
        console.log(this.recipe);
      }
    );
  }

  onAdd() {
    this.servingCount = this.servingCount + 1;
  }
  ngOnDestroy() {
    if (this.selectedRecipeSubscription) {
      this.selectedRecipeSubscription.unsubscribe();
    }
  }
}
