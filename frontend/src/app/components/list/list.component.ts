import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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

  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset 
          || document.documentElement.scrollTop 
          || document.body.scrollTop || 0;
    
    const pageHeight = document.body.scrollHeight - 640;

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

    this.apiService.listMultiplePokemons(getMyPokemons).subscribe(
      res => this.myPokemons = res.data
    );
    
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

    this.showOnlyMyPokemons = false;

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

  public filterResults(event: any) {

    if(event.target.checked){
      this.showOnlyMyPokemons = false;
    } else {
      this.showOnlyMyPokemons = true;
    }
    
  }

}
