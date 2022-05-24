import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'http://localhost:3000/api/pokemon';

  constructor(
    private http: HttpClient
  ) { }

  public listPokemons(page: number = 1):Observable<any> {
    return this.http.get<any>(`${this.url}/?page=${page}`).pipe(
      tap(res => res),
    );
  }

  public listMultiplePokemons(list: Array<String>):Observable<any> {
    return this.http.get<any>(`${this.url}/multiple/${JSON.stringify(list)}`).pipe(
      tap(res => res),
    );
  }

  public searchSinglePokemon(name: string, page: number = 1):Observable<any> {
    return this.http.get<any>(`${this.url}/?s=${name}&page=${page}`).pipe(
      map(res => res)
    );
  }

  public getSinglePokemon(id: string):Observable<any> {
    return this.http.get<any>(`${this.url}/single/${id}`).pipe(
      map(res => res)
    );
  }
  
}
