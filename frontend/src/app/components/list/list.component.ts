import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public allPokemons: any;  

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.listPokemons().subscribe(
      res => this.allPokemons = res.data
    );
  }

  public getSearchValue(value: string) {
    const filter = this.allPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    })

    this.allPokemons = filter;
  }

}
