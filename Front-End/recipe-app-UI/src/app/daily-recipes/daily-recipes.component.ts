import { Component, Input, OnInit } from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";
import { MainComponentApi } from '../main-page/main-page.component';

@Component({
  selector: 'app-daily-recipes',
  templateUrl: './daily-recipes.component.html',
  styleUrls: ['./daily-recipes.component.css']
})
export class DailyRecipesComponent implements OnInit {
  dish: string = '';
  recipe: Recipe;
  appComponent: typeof AppComponent;
  @Input() parentApi!: MainComponentApi

  constructor(private recipeservice: RecipeService, private router: Router) {
    this.appComponent = AppComponent;
    this.recipe = {};
  }
  ngOnInit(): void {
  }
  submit() {
    // this.recipeservice.submit(this.dish, 4).subscribe({
    //   next: (recipe: Recipe) => {
    //     this.router.navigate(['ingredients']).then(() => {
    //       window.location.reload();
    //     });
    //   },
    // });
  }
  submitManual(data: string){
    this.parentApi.callParentMethod(data);
  }

}
