import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeserviceService } from '../recipeservice.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipeserviceService) {
    this.recipe = {};
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    this.recipe = this.recipeService.getRecipe();
  }
}
