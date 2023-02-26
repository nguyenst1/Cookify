import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { RecipeHttp } from './recipeHttp';

@Injectable({
  providedIn: 'root',
})
export class InstructionService {
  private currentInstruction: String = "";
  private nextInstructionImageUrl: String = "";
  constructor( private recipeHttp: RecipeHttp, private recipeService: RecipeService) {

  }

  getInstructionImageUrl(instruction: String)  : any {
    this.recipeHttp.getImage(instruction).subscribe((nextInstruction) => {
      return nextInstruction.url;
    });
  }

}
