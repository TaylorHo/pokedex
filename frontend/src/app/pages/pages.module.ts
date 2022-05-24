// ------------------- Default --------------------
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
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }