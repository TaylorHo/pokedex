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

      // referência para os taps e maps ===> https://rxjs.dev/guide/overview
      tap(res => res),
    );
  }

  public searchSinglePokemon(name: string, page: number = 1):Observable<any> {
    return this.http.get<any>(`${this.url}/?s=${name}&page=${page}`).pipe(
      map(res => res)
    );
  }

  public getSinglePokemon(id: string):Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(res => res)
    );
  }
  
}
