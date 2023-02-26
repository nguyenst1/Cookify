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
  @Input() recipe: Recipe;
  instruction: any[];
  currentInstruction: any;
  currentIndex: number = 0;
  instructionImageUrl: any;

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

  getRecipe() {
    this.recipe = this.recipeService.getrecipe();
    this.recipe.instructions?.forEach(i => {
      this.instruction.push(i);
    })
    this.currentInstruction = this.instruction[0];
    this.getInstructionUrl();

  }

  getInstructionUrl(){
    this.recipeHttp.getImage(this.currentInstruction).subscribe((nextInstruction) => {
      this.instructionImageUrl = nextInstruction.url;
    });
  }
}
