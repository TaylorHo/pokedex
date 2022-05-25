// ------------------- Imports --------------------
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// ------------------------------------------------


// ------------------ Services --------------------
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
// ------------------------------------------------


// --------------------- Main ---------------------
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  public pokemon: any;
  public isLoaded: boolean = false;
  public diceValue: number = 0;
  public gameTitle: string = 'Tire mais de 3 para capturar';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentPokemon();
    this.verifyPokemonOwn();
  }

  // Get the information of the current Pokemon, specified by the ID
  public getCurrentPokemon() {
    const pokemon = this.apiService.getSinglePokemon(
      this.activatedRoute.snapshot.params['id']
    );

    return pokemon.subscribe(res => {
      this.pokemon = res.data;
      this.isLoaded = true;
    });
  }

  // Get a random number from 1-6 to verify if the user won or lost the battle
  public rollDice() {
    var roll = Math.floor((Math.random() * 6) + 1);
    this.diceValue = roll;

    // await the dice animation to be reproduced
    setTimeout(() => {

      if (roll > 3) { // won the battle!!
        const id = this.activatedRoute.snapshot.params['id'];

        this.gameTitle = "Parabéns!! Capturou o Pokemon!!";
        this.storageService.saveNewPokemon(id);

        setTimeout(() => {
          this._router.navigate([`info`, id]);
        }, 1.6 * 1000); // 1.6 seconds

      } else {
        this.gameTitle = "Tente Novamente!!";
      }
      
    }, 2.2 * 1000); // 2.2 seconds

  }

  // If the user already has captured this pokemon (speccified by the ID)
  // then redirect from /battle/{id} to /info/{id}
  public verifyPokemonOwn() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.storageService.verifyPokemon(id);

    if(pokemon){
      this._router.navigate([`info`, id]);
    }

  }

}
// ------------------------------------------------
