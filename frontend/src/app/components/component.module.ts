// ------------------- Default --------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ------------------------------------------------


// ------------------ Components ------------------
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { DiceComponent } from './dice/dice.component';
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent,
    DiceComponent
  ],
  exports: [
    HeaderComponent,
    ListComponent,
    DiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
