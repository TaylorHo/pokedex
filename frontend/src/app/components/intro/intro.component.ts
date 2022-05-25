import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  public showIntroMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {

    const haveShowed = localStorage.getItem('pokemonIntroShowed');

    if(!haveShowed){
      this.showIntroMessage = true;
      localStorage.setItem('pokemonIntroShowed', 'yes');
    }

  }

  public closeIntro() {
    this.showIntroMessage = false;
  }

  public showIntro() {
    this.showIntroMessage = true;
  }

}
