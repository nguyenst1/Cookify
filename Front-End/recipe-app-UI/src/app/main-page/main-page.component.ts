import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  dish: string = '';
  appComponent: typeof AppComponent;

  constructor(private router: Router) {
    this.appComponent = AppComponent;
  }

  ngOnInit(): void {}
  submit() {
    this.router.navigate(['ingredients']).then(() => {
      window.location.reload();
    });
    // this.recipeservice.submit(this.dish).subscribe({
    //   next: (recipe) => {
    //     this.router.navigate(['ingredients']).then(() => {
    //       window.location.reload();
    //     });
    //   },
    // });
  }
}
