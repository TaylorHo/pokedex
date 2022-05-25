// ------------------- Imports --------------------
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// ------------------------------------------------


// ------------------ Services --------------------
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
// ------------------------------------------------


// --------------------- Main ---------------------
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public pokemon: any;
  public isLoaded: boolean = false;
  public ownThePokemon: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
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

  // Verify if the user has already captured the Pokemon, specified by the ID
  // Used to show (or not) the buttom to capture the Pokemon
  public verifyPokemonOwn() {
    const pokemon = this.storageService.verifyPokemon(
      this.activatedRoute.snapshot.params['id']
    );

    this.ownThePokemon = pokemon;
  }

}
// ------------------------------------------------
