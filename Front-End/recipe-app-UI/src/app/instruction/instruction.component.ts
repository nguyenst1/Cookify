import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import {InstructionService} from "../instruction.service";
import {RecipeHttp} from "../recipeHttp";

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  // private _recipe!: Recipe;
  // @Input('recipe')
  // set recipe(recipe: Recipe) {
  //   if(recipe === undefined || Object.keys(recipe).length === 0){
  //     this.getRecipe();
  //   }
  // }

  // get recipe(): Recipe { return this._recipe; }
  @Input() recipe: Recipe;
  instruction: any[];
  currentInstruction: any;
  currentIndex: number = 0;
  instructionImageUrl: any;
  isInstructionAPIOnGng: Boolean = false;

  constructor(private recipeService: RecipeService,  private recipeHttp: RecipeHttp) {
    this.recipe = {};
    this.instruction = [];
  }

  next(): void {
    if (this.instruction.length - 1 <= this.currentIndex) {
    } else {
      this.currentIndex++;
      this.currentInstruction = this.instruction[this.currentIndex];
      this.instructionImageUrl = this.getInstructionUrl()

    }
  }
  previous(): void {
    if (this.currentIndex === 0) {
    } else {
      this.currentIndex--;
      this.currentInstruction = this.instruction[this.currentIndex];
      this.instructionImageUrl = this.getInstructionUrl()
    }
  }

  ngOnInit(): void {
     this.getRecipe(); // TODO
  }

  public getRecipe() {
    this.recipe = this.recipeService.getrecipe();
    this.recipe.instructions?.forEach(i => {
      this.instruction.push(i);
    })
    this.currentInstruction = this.instruction[0];
    this.getInstructionUrl();

  }

  getInstructionUrl(){
    this.isInstructionAPIOnGng = true;
    this.recipeHttp.getImage(this.currentInstruction).subscribe((nextInstruction) => {
      this.instructionImageUrl = nextInstruction.url;
      this.isInstructionAPIOnGng = false;
    });
  }
}
