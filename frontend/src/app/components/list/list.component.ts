// ------------------- Imports --------------------
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
// ------------------------------------------------


// ------------------ Services --------------------
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
// ------------------------------------------------


// --------------------- Main ---------------------
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('input') inputElement!: ElementRef;

  public allPokemons: Array<any> = [];
  public myPokemons: Array<any> = [];
  public myPokemonsIds: Array<string> = [];

  public pokemonToSearch: string = '';
  public lastSearch: string = '';

  public currentPage: number = 1;
  public isLoadingMore: boolean = false;
  public lastPageHeight: number = 0;
  public showOnlyMyPokemons: boolean = true;

  // Listen the Scroll event, to know when to load more Pokemons
  // for the Infinite Scroll Load
  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset ||
                           document.documentElement.scrollTop ||
                           document.body.scrollTop ||
                           0;
    
    const pageHeight = document.body.scrollHeight - 640;

    // Limit the API calls, based on load time
    if(this.lastPageHeight != pageHeight){
      this.lastPageHeight = pageHeight;
      this.isLoadingMore = false;
    }

    // if the user have viewed 80% or more of the page, load more Pokemons
    if(verticalOffset >= (pageHeight * 0.80) && !this.isLoadingMore){
      this.isLoadingMore = true;
      this.loadMore();
    }
    
  }

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {

    const getMyPokemons = this.storageService.getSavedPokemons();
    this.myPokemonsIds = getMyPokemons;

    // Fill "my Pokemons" array
    this.apiService.listMultiplePokemons(getMyPokemons).subscribe(
      res => this.myPokemons = res.data
    );
    
    // Fill "all Pokemons" array
    this.apiService.listPokemons(this.currentPage).subscribe(
      res => this.allPokemons = res.data
    );

  }

  ngAfterViewInit(): void {
    // Watch the time between key press
    // when the time is upper than 800 ms, executed the search,
    // without needind to press a button =)
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe(() => {
        if(this.lastSearch != this.pokemonToSearch){
          this.searchPokemon();
        }
      });
  }

  // Update the name of the pokemon to search
  // (the search isn't executed here to don't make too many requests to the API)
  public onInput(event: any) {
    this.pokemonToSearch = event.target.value;
  }

  // Search a Pokemon by his name (or a piece of it)
  public searchPokemon() {
    this.lastSearch = this.pokemonToSearch;
    this.currentPage = 1;
    
    // Update the Pokemons list with the search results
    this.apiService.searchSinglePokemon(this.pokemonToSearch).subscribe(
      res => this.allPokemons = res.data
    );

    this.showOnlyMyPokemons = false;

  }

  // Load mores Pokemons, called on Window Scroll (infinite scroll system)
  public loadMore() {
    this.currentPage++;
    
    if(this.pokemonToSearch){ // more of the searched Pokemon
      this.apiService.searchSinglePokemon(this.pokemonToSearch, this.currentPage).subscribe(
        res => this.allPokemons = this.allPokemons.concat(res.data)
      );
    } else { // more of the "all Pokemons list"
      this.apiService.listPokemons(this.currentPage).subscribe(
        res => this.allPokemons = this.allPokemons.concat(res.data)
      );
    }

  }

  // Change between "Captured Pokemons" and "All Pokemons"
  public filterResults(event: any) {

    if(event.target.checked){
      this.showOnlyMyPokemons = false;
    } else {
      this.showOnlyMyPokemons = true;
    }
    
  }

}
// ------------------------------------------------
