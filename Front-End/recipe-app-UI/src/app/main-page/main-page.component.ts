import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  dish: string = '';
  recipe: Recipe;
  displayRecipe: boolean = false;
  appComponent: typeof AppComponent;
  serving: number = 4;

  constructor(private recipeservice: RecipeService, private router: Router) {
    this.appComponent = AppComponent;
    this.recipe = {};
  }

  ngOnInit(): void {}
  submit() {
    this.recipeservice.submit(this.dish, this.serving).subscribe({
      next: (recipe: Recipe) => {
        this.displayRecipe = true;
      },
    });
  }
  submitManual(data: string) {
    this.dish = data;
    this.submit();
  }
}
