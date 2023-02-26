import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-daily-recipes',
  templateUrl: './daily-recipes.component.html',
  styleUrls: ['./daily-recipes.component.css']
})
export class DailyRecipesComponent implements OnInit {
  dish: string = '';
  recipe: Recipe;
  appComponent: typeof AppComponent;

  constructor(private recipeservice: RecipeService, private router: Router) {
    this.appComponent = AppComponent;
    this.recipe = {};
  }
  ngOnInit(): void {
  }
  submit() {
    this.recipeservice.submit(this.dish).subscribe({
      next: (recipe: Recipe) => {
        this.router.navigate(['ingredients']).then(() => {
          window.location.reload();
        });
      },
    });
  }
  submitManual(data: string){
    this.dish = data;
    this.submit();
  }

}
