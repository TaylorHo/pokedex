import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

// ---- Services -----
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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
    this.getCurrentPokemon;
    this.verifyPokemonOwn();
  }

  get getCurrentPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.apiService.getSinglePokemon(id);

    return pokemon.subscribe(res => {
      this.pokemon = res.data;
      this.isLoaded = true;
    });
  }

  public verifyPokemonOwn() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.storageService.verifyPokemon(id);

    this.ownThePokemon = pokemon;
  }

}
