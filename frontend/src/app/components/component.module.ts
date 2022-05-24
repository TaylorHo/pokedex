// ------------------- Default --------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ------------------------------------------------


// ------------------ Components ------------------
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent
  ],
  exports: [
    HeaderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
