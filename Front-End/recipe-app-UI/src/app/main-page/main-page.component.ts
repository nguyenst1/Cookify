import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RecipeHttp } from '../recipeHttp';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  dish: string = '';
  recipe: Recipe;
  appComponent: typeof AppComponent;
  isApiHit: Boolean = false;
  url: any;
  isRecipeValid: Boolean = true;

  constructor(private recipeservice: RecipeService, private recipeHttpService: RecipeHttp, private router: Router) {
    this.appComponent = AppComponent;
    this.recipe = {};
  }

  ngOnInit(): void {}
  submit() {
    this.isApiHit = true;
    this.recipeHttpService.submit(this.dish).subscribe({
      next: (recipe: any) => {
        debugger;
        if(recipe.error_code != undefined && recipe.error_code === "NOT_A_VALID_RECIPE"){
          this.isRecipeValid = false;
        }else{
          this.isRecipeValid = true;
          this.recipeservice.recipe = recipe;
          this.recipeservice.getNextInstructionImageUrl();
        }
      },
    });
  }
  submitManual(data: string){
    this.dish = data;
    this.submit();
  }
}
