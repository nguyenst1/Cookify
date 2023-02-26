import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { InstructionService } from '../instruction.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { RecipeHttp } from '../recipeHttp';
import { SessionService } from '../session.service';
//import { RecipeHttp } from '../recipeHttp';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public isLogIn: boolean| undefined;
  dish: string = '';
  recipe: Recipe;
  isNotSearched: boolean;
  displayRecipe: boolean = false;
  appComponent: typeof AppComponent;
  serving: number = 4;
  isApiHit: boolean = false;
  isRecipeValid: boolean = true;

  constructor(private recipeservice: RecipeService, private router: Router,  private sessionService: SessionService, private recipeHttpService: RecipeHttp, private instructionService: InstructionService) {
    this.appComponent = AppComponent;
    this.recipe = {};
    this.isNotSearched = true;
  }

  ngOnInit(): void {
    this.isLogIn = this.sessionService.getIsLogIn();
  }
  submit() {
    this.isApiHit = true;
    this.isNotSearched = false;
    this.recipeHttpService.submit(this.dish, this.serving).subscribe({
      next: (recipe: any) => {
          this.isRecipeValid = true;
          this.displayRecipe = true;
          this.isApiHit = false;
          this.recipeservice.recipe = recipe;
          this.instructionService.getNextInstructionImageUrl();
      },
      error: (err: any) => {
      if(err.status === 412 && err.error.error_code === "NOT_A_VALID_RECIPE"){
        this.isRecipeValid = false;
        this.isApiHit = false;
      }
      }
    });
  }
  submitManual(data: string){
    this.dish = data;
    this.submit();
  }
}
