import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeHttp } from './recipeHttp';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipe: Recipe;
  private currentInstruction: String = "";
  private nextInstructionImageUrl: String = ""; 
  constructor(private recipeHttp: RecipeHttp) {
    this.recipe = {};
  }
  getrecipe(): Recipe {
    return this.recipe;
  }
  updateNextInstructionImageUrl(instruction: String) {
    this.recipeHttp.getImage(instruction).subscribe((nextInstruction) => {
      console.log(nextInstruction);
      this.nextInstructionImageUrl = nextInstruction.url || "";
      this.currentInstruction = instruction;
    });
  }
  getNextInstructionImageUrl() {
    if(this.recipe != undefined && this.recipe.instructions != undefined){
      if(this.currentInstruction === ""){
        this.updateNextInstructionImageUrl(this.recipe.instructions[0]);
        return this.currentInstruction;
      }else{
        let isNextInstruction: Boolean = false;
        let tempNextInstructionImageUrl = this.currentInstruction;
        this.recipe.instructions.forEach((instruction) => {
          if(instruction.toString() === this.currentInstruction){
            isNextInstruction = true;
          }else if(isNextInstruction){
            this.updateNextInstructionImageUrl(instruction.toString());
            tempNextInstructionImageUrl = this.nextInstructionImageUrl;
            isNextInstruction = false;
          }
        });
        if(isNextInstruction){
          tempNextInstructionImageUrl = this.nextInstructionImageUrl;
        }
        return tempNextInstructionImageUrl;
      }
    }

  }
}
