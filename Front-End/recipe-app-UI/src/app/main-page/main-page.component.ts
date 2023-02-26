import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { SessionService } from '../session.service';

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

  constructor(
    private recipeservice: RecipeService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.appComponent = AppComponent;
    this.recipe = {};
    this.isNotSearched = true;
  }

  ngOnInit(): void {
    this.isLogIn = this.sessionService.getIsLogIn();
  }
  submit() {
    this.isNotSearched = false;
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
