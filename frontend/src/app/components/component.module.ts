// ------------------- Imports --------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// ------------------------------------------------


// ------------------ Components ------------------
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { DiceComponent } from './dice/dice.component';
import { IntroComponent } from './intro/intro.component';
// ------------------------------------------------


// --------------------- Main ---------------------
@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent,
    DiceComponent,
    IntroComponent
  ],
  exports: [
    HeaderComponent,
    ListComponent,
    DiceComponent,
    IntroComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
// ------------------------------------------------
