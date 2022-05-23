// ------------------- Default --------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ------------------------------------------------


// ------------------ Components ------------------
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ListComponent
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
