// ------------------- Imports --------------------
import { Injectable } from '@angular/core';
// ------------------------------------------------


// --------------------- Main ---------------------
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Description: Save and retrieve localStorage information
  //              about the captured Pokemons.

  constructor() { }

  // Save the ID of a Pokemon
  // Used to keep the info of wich Pokemons were captured
  public saveNewPokemon(id: string){

    let pokemons: Array<String> = this.getSavedPokemons();

    if (pokemons.length > 0){ // must have saved Pokemons
      if(!pokemons.includes(id)){ // if doesn't contain the current Pokemon yet
        pokemons.push(id);
        localStorage.setItem('capturedPokemons', JSON.stringify(pokemons));
      }

    } else { // save the current Pokemon
      localStorage.setItem('capturedPokemons', JSON.stringify([id]));
    }

  }

  // Return the array of saved Pokemons
  // Response used to manage frontend look
  public getSavedPokemons(){

    const pokemons = localStorage.getItem('capturedPokemons');
    
    return pokemons ? JSON.parse(pokemons) : [];

  }

  // Verify if the Pokemon was captured or yet not
  // Returns true or false
  public verifyPokemon(id: string) {
    const pokemons = this.getSavedPokemons();

    return pokemons.length > 0 &&
           pokemons.includes(id)
           ? true
           : false;

  }

}
// ------------------------------------------------
