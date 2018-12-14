import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Recipe, RecipeId } from '../models/recipe.model';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  _recipes: Observable<RecipeId[]>;
  _initRecipesSubscription: Subscription;
  recipes: Recipe[];
  constructor(
    private readonly afs: AngularFirestore,
    public dataService: DataService
  ) {}

  private recipesCollection: AngularFirestoreCollection<Recipe>;

  ngOnInit() {
    this._recipes = this.dataService.getRecipes();
    this.recipesCollection = this.afs.collection<Recipe>('recipes', ref => {
      return ref.orderBy('createDt', 'desc').limit(2);
    });
    this._initRecipesSubscription = this.recipesCollection
      .snapshotChanges()
      .pipe(
        map(actions => {
          this.recipes = actions.map(a => {
            const data = a.payload.doc.data() as Recipe;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      )
      .subscribe(res => {
        console.log(this.recipes);
        this.dataService.setRecipes(this.recipes);
        this._initRecipesSubscription.unsubscribe();
      });
  }
}
