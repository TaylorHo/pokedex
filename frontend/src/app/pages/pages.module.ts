// ------------------- Imports --------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ------------------------------------------------


// -------------------- Modules ---------------------
import { RoutingModule } from './routing.module';
import { ComponentsModule } from '../components/component.module';
// ------------------------------------------------


// -------------------- Pages ---------------------
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { BattleComponent } from './battle/battle.component';
// ------------------------------------------------


// --------------------- Main ---------------------
@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent,
    BattleComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
// ------------------------------------------------
