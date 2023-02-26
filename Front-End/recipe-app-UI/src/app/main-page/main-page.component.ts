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
  isNotSearched: boolean;
  appComponent: typeof AppComponent;

  constructor(private recipeservice: RecipeService, private router: Router) {
    this.appComponent = AppComponent;
    this.recipe = {};
    this.isNotSearched = true;
  }

  ngOnInit(): void {}
  submit() {
    this.isNotSearched = false;
    this.recipeservice.submit(this.dish).subscribe({
      next: (recipe: Recipe) => {
        // this.router.navigate(['ingredients']).then(() => {
        //   window.location.reload();
        // });
      },
    });
  }
}
