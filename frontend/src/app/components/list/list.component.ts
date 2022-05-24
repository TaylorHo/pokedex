import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('input')
  inputElement!: ElementRef;
  public allPokemons: any;
  public pokemonToSearch: string = '';
  public lastSearch: string = '';
  public currentPage: number = 1;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.listPokemons(this.currentPage).subscribe(
      res => this.allPokemons = res.data
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputElement.nativeElement, 'keyup').pipe(debounceTime(800), distinctUntilChanged()).subscribe(() => {
      if(this.lastSearch != this.pokemonToSearch){
        this.searchPokemon();
      }
    });
  }

  onInput(event: any) {
    this.pokemonToSearch = event.target.value;
  }

  public searchPokemon() {
    this.lastSearch = this.pokemonToSearch;
    this.currentPage = 1;
    
    this.apiService.searchSinglePokemon(this.pokemonToSearch).subscribe(
      res => this.allPokemons = res.data
    );
  }

  public loadMore() {
    this.currentPage++;
    
    if(this.pokemonToSearch){
      this.apiService.searchSinglePokemon(this.pokemonToSearch, this.currentPage).subscribe(
        res => this.allPokemons = this.allPokemons.concat(res.data)
      );    
    } else {
      this.apiService.listPokemons(this.currentPage).subscribe(
        res => this.allPokemons = this.allPokemons.concat(res.data)
      );
    }

  }

}
