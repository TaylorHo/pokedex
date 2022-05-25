// ------------------- Imports --------------------
import { Component, Input, OnInit } from '@angular/core';
// ------------------------------------------------


// --------------------- Main ---------------------
@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {

  public diceClassName: string = "dice";

  constructor() { }

  ngOnInit(): void {
  }

  // Receive the component parameter, that will define the animation
  // to be reproduced. The parameter can be a number from 1-6
  @Input()
  set diceValue(value: number) {
    this.diceClassName = `dice roll-${value}`;
  }

}
// ------------------------------------------------
