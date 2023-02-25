import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  submit(dish: string): Observable<any> {
    return this.http.get<any>(this.url + 'submit/' + dish).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
