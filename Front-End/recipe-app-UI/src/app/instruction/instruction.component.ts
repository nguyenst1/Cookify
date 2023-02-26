import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  instruction: [{ value: string }, { value: string }, { value: string }, { value: string }, { value: string }, { value: string }, { value: string }];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  constructor() {
    this.instruction = [
      {
        "value": "Preheat oven to 425 degrees Fahrenheit."
      },
      {
        "value": "Place the pizza dough on a greased baking sheet and use a rolling pin to flatten the dough evenly."
      },
      {
        "value": "Spread the pizza sauce evenly over the pizza dough, leaving about 1/2-inch of the edge uncovered."
      },
      {
        "value": "Sprinkle the mozzarella cheese over the sauce, followed by the pepperoni slices, and top with the Parmesan cheese."
      },
      {
        "value": "Bake in preheated oven for 12-15 minutes, or until the cheese is melted and the crust is golden brown."
      },
      {
        "value": "Remove from oven and let cool for 5 minutes before serving. Enjoy!"
      },
      {
        "value": "You can use store-bought pizza dough, or use your own favorite homemade recipe."
      }
    ]
  }

  ngOnInit(): void {
  }

}
