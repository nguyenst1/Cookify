import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RecipeserviceService } from '../recipeservice.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeservice: RecipeserviceService) {
    this.recipe = {};
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipe = this.recipeservice.getRecipe();
  }
}
