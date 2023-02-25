import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getHeaders(): any {
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:4200"
      
    });
  }

  submit(dish: string): Observable<any> {
    return this.http.get<any>(this.url + 'recipe' + "?&food_item=" + dish, { headers: this.getHeaders() }).pipe(
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
