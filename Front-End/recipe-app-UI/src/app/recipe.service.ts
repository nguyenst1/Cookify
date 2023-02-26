import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeHttp } from './recipeHttp';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipe: Recipe;
  private currentInstruction: String = "";
  private nextInstructionImageUrl: String = ""; 
  constructor( ) {
    this.recipe = {};
  }
  getrecipe(): Recipe {
    return this.recipe;
  }
  setRecipe(value: Recipe) {
    this.recipe = value;
  }
}
