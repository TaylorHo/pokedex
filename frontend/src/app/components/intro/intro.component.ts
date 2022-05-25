// ------------------- Imports --------------------
import { Component, OnInit } from '@angular/core';
// ------------------------------------------------


// --------------------- Main ---------------------
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  public showIntroMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.haveShowedTheIntro();
  }

  // Verify if the intro/help message was showed to the user at least one time
  public haveShowedTheIntro() {
    const haveShowed = localStorage.getItem('pokemonIntroShowed');

    if(!haveShowed){
      this.showIntroMessage = true;
      localStorage.setItem('pokemonIntroShowed', 'yes');
    }
  }

  // Update the intro/help message visibility
  public changeIntroState(state: boolean){
    this.showIntroMessage = state;
  }

}
// ------------------------------------------------
