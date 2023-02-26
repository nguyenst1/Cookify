import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
    this.recipe = {};
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipe = this.recipeService.getrecipe();
  }
}
