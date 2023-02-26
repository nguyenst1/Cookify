import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeserviceService } from './recipeservice.service';
//import { RecipeHttp } from './recipeHttp';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private url = 'http://localhost:8080/';
  public recipe: Recipe;
  public getHeaders(): any {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  }
  private currentInstruction: String = "";
  private nextInstructionImageUrl: String = ""; 
  constructor( private recipeService: RecipeserviceService) { //private recipeHttp: RecipeHttp,
    this.recipe = {};
  }
  getrecipe(): Recipe {
    return this.recipe;
  }
  // updateNextInstructionImageUrl(instruction: String) {
  //   this.recipeHttp.getImage(instruction).subscribe((nextInstruction) => {
  //     console.log(nextInstruction);
  //     this.nextInstructionImageUrl = nextInstruction.url || "";
  //     this.currentInstruction = instruction;
  //   });
  // }
  // getNextInstructionImageUrl() {
  //   if(this.recipe != undefined && this.recipe.instructions != undefined){
  //     if(this.currentInstruction === ""){
  //       this.updateNextInstructionImageUrl(this.recipe.instructions[0]);
  //       return this.currentInstruction;
  //     }else{
  //       let isNextInstruction: Boolean = false;
  //       let tempNextInstructionImageUrl = this.currentInstruction;
  //       this.recipe.instructions.forEach((instruction) => {
  //         if(instruction.toString() === this.currentInstruction){
  //           isNextInstruction = true;
  //         }else if(isNextInstruction){
  //           this.updateNextInstructionImageUrl(instruction.toString());
  //           tempNextInstructionImageUrl = this.nextInstructionImageUrl;
  //           isNextInstruction = false;
  //         }
  //       });
  //       if(isNextInstruction){
  //         tempNextInstructionImageUrl = this.nextInstructionImageUrl;
  //       }
  //       return tempNextInstructionImageUrl;
  //     }
  //   }
  // }

  authenticateUser(username: string, password: string): any {
    // const body = { username: username, password: password };
    // return this.http.post<any>(this.url + 'authenticate', body).pipe(
    //   map((response) => {
    //     return response;
    //   }),
    //   catchError(this.handleUserError<any>({ status: 'failure' }))
    // );
    return undefined;
  }

  public handleUserError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  //this.recipeService.setRecipe(this.recipe);
}
