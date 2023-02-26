import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttp {
  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  public getHeaders(): any {
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:4200"
      
    });
  }

  submit(dish: string, serving: number): Observable<any> {
    return this.http.get<any>(this.url + 'recipe' + "?&food_item=" + dish + "&serving=" + serving, { headers: this.getHeaders() }).pipe(
      map((response) => {
        this.recipeService.setRecipe(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getImage(instruction: String): Observable<any> {
    return this.http.get<any>(this.url + 'recipe/instruction/image' + "?&food_instruction=" + instruction, { headers: this.getHeaders() }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  authenticateUser(username: string, password: string): any {
    const body = { username: username, password: password };
    return this.http.post<any>(this.url + 'authenticate', body).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleUserError<any>({ status: 'failure' }))
    );
  }

  public handleUserError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  handleError(error: any): Observable<Response> {

    let errorMessage: string = '';
 
    if (!(error.error instanceof ErrorEvent)) {

 
      return throwError(error);
 
    }
    return throwError(error);
 
  }

}
