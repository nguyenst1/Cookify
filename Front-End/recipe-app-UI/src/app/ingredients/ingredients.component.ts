import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeservice: RecipeService) {
    this.recipe = {};
  }

  ngOnInit(): void {
    this.recipe = this.recipeservice.getrecipe();
  }
}
