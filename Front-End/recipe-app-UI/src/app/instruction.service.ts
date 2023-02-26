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
 
  updateNextInstructionImageUrl(instruction: String) {
    this.recipeHttp.getImage(instruction).subscribe((nextInstruction) => {
      console.log(nextInstruction);
      this.nextInstructionImageUrl = nextInstruction.url || "";
      this.currentInstruction = instruction;
    });
  }
  getNextInstructionImageUrl() {
    if(this.recipeService.recipe != undefined && this.recipeService.recipe.instructions != undefined){
      if(this.currentInstruction === ""){
        this.updateNextInstructionImageUrl(this.recipeService.recipe.instructions[0]);
        return this.currentInstruction;
      }else{
        let isNextInstruction: Boolean = false;
        let tempNextInstructionImageUrl = this.currentInstruction;
        this.recipeService.recipe.instructions.forEach((instructionLocal) => {
          if(instructionLocal.toString() === this.currentInstruction){
            isNextInstruction = true;
          }else if(isNextInstruction){
            this.updateNextInstructionImageUrl(instructionLocal.toString());
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
