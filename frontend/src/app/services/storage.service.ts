import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveNewPokemon(id: string){

    let pokemons: Array<String> = this.getSavedPokemons();

    if (pokemons.length > 0){

      if(!pokemons.includes(id)){ // if doesn't contain yet
        pokemons.push(id);
        localStorage.setItem('capturedPokemons', JSON.stringify(pokemons));
      }

    } else {
      localStorage.setItem('capturedPokemons', JSON.stringify([id]));
    }

  }

  public getSavedPokemons(){

    const pokemons = localStorage.getItem('capturedPokemons');
    
    if(pokemons){
      return JSON.parse(pokemons);
    } else {
      return [];
    }

  }

  public verifyPokemon(id: string) {
    const pokemons = this.getSavedPokemons();

    if(pokemons.length > 0 && pokemons.includes(id)){
      return true;
    } else {
      return false;
    }

  }

}
