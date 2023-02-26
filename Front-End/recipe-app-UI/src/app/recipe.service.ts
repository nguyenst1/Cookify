import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeserviceService } from './recipeservice.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:8080/';
  private recipe: Recipe;
  constructor(
    private http: HttpClient,
    private recipeService: RecipeserviceService
  ) {
    this.recipe = {};
  }

  public getHeaders(): any {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    });
  }

  public handleUserError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  submit(dish: string, serving: number): Observable<any> {
    return this.http
      .get<any>(this.url + 'recipe' + '?&food_item=' + dish + serving, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          this.recipe = response;
          this.recipeService.setRecipe(this.recipe);
          return response;
        })
      );
  }
  getrecipe(): Recipe {
    return this.recipe;
  }

  authenticateUser(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post<any>(this.url + 'authenticate', body).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleUserError<any>({ status: 'failure' }))
    );
  }
}
