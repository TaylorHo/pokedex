import { Component, Input, OnInit } from '@angular/core';

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

  @Input()
  set diceValue(value: number) {
    this.diceClassName = `dice roll-${value}`;
  }

}
