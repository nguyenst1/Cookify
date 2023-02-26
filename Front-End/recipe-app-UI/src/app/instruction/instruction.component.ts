import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  instruction: any[];
  currentInstruction: any;
  currentIndex: number = 0;

  constructor() {
    this.instruction = [
      "Preheat oven to 425 degrees Fahrenheit.",
      "Place the pizza dough on a greased baking sheet and use a rolling pin to flatten the dough evenly.",
      "Spread the pizza sauce evenly over the pizza dough, leaving about 1/2-inch of the edge uncovered.",
      "Sprinkle the mozzarella cheese over the sauce, followed by the pepperoni slices, and top with the Parmesan cheese.",
      "Bake in preheated oven for 12-15 minutes, or until the cheese is melted and the crust is golden brown.",
      "Remove from oven and let cool for 5 minutes before serving. Enjoy!",
      "You can use store-bought pizza dough, or use your own favorite homemade recipe."
    ]
    this.currentInstruction = this.instruction[0];
  }

  ngOnInit(): void{

  }

  next(): void{
    if(this.instruction.length - 1 <= this.currentIndex){

    }else{
      this.currentIndex++;
      this.currentInstruction = this.instruction[this.currentIndex];
    }
  }
  previous(): void{
    if(this.currentIndex === 0){

    }else{
      this.currentIndex--;
      this.currentInstruction = this.instruction[this.currentIndex];
    }
  }


}
