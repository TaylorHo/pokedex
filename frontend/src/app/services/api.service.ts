// ------------------- Imports --------------------
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// ------------------------------------------------


// --------------------- Main ---------------------
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Description: Execute HTTP requests (just GET requests to the API)
  //              to retrieve Pokemon data

  private url: string = 'http://localhost:3000/api/pokemon';

  constructor(
    private http: HttpClient
  ) { }

  // Retrieve all pokemons (in an array), alphabetically, 20 by 20
  public listPokemons(page: number = 1):Observable<any> {
    return this.http.get<any>(`${this.url}/?page=${page}`).pipe(
      map(res => res),
    );
  }

  // Retrieve an array of Pokemons, based on IDs passed to the request
  public listMultiplePokemons(list: Array<String>):Observable<any> {
    return this.http.get<any>(`${this.url}/multiple/${JSON.stringify(list)}`).pipe(
      map(res => res),
    );
  }

  // Retrieve all pokemons (20 per time) that coresponds to the search param
  public searchSinglePokemon(name: string, page: number = 1):Observable<any> {
    return this.http.get<any>(`${this.url}/?s=${name}&page=${page}`).pipe(
      map(res => res)
    );
  }

  // Get all information from a single Pokemon, based on his ID
  public getSinglePokemon(id: string):Observable<any> {
    return this.http.get<any>(`${this.url}/single/${id}`).pipe(
      map(res => res)
    );
  }
  
}
// ------------------------------------------------
