import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeserviceService {
  private recipe: any;
  constructor() {}
  setRecipe(value: Recipe) {
    this.recipe = value;
  }

  ngOnInit() {}

  getRecipe(): Recipe {
    return this.recipe;
  }
}
