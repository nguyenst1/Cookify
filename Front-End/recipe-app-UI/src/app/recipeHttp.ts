import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttp {
  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {
  }

  public getHeaders(): any {
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "http://localhost:4200"
      
    });
  }

  submit(dish: string): Observable<any> {
    return this.http.get<any>(this.url + 'recipe' + "?&food_item=" + dish, { headers: this.getHeaders() }).pipe(
      map((response) => {
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

  handleError(error: any): Observable<Response> {

    let errorMessage: string = '';
 
    if (!(error.error instanceof ErrorEvent)) {

 
      return throwError(error);
 
    }
    return throwError(error);
 
  }

}
