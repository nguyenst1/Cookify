import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:8080/';
  private recipe: Recipe;
  constructor(private http: HttpClient) {
    this.recipe = {};
  }

  submit(dish: string): Observable<any> {
    return this.http.get<any>(this.url + 'recipe/' + dish).pipe(
      map((response) => {
        this.recipe = response;
        return response;
      })
    );
  }
  getrecipe(): Recipe {
    return this.recipe;
  }
}
