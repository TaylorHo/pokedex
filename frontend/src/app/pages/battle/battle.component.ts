import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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

  public getCurrentPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.apiService.getSinglePokemon(id);

    return pokemon.subscribe(res => {
      this.pokemon = res.data;
      this.isLoaded = true;
    });
  }

  public rollDice() {
    var roll = Math.floor((Math.random() * 6) + 1);
    this.diceValue = roll;

    setTimeout(() => {

      if (roll > 3) {
        this.gameTitle = "Parabéns!! Capturou o Pokemon!!";

        this.storageService.saveNewPokemon(this.activatedRoute.snapshot.params['id']);

        setTimeout(() => {
          this._router.navigate([`info`, this.activatedRoute.snapshot.params['id']]);
        }, 1.6 * 1000); // 1.6 seconds

      } else {
        this.gameTitle = "Tente Novamente!!";
      }
      
    }, 2.2 * 1000); // 2.2 seconds

  }

  public verifyPokemonOwn() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.storageService.verifyPokemon(id);

    if(pokemon){
      this._router.navigate([`info`, id]);
    }

  }

}
