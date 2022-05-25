// ------------------- Default --------------------
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ------------------------------------------------


// -------------------- Pages ---------------------
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { BattleComponent } from './battle/battle.component';
// ------------------------------------------------


// -------------------- Paths ---------------------
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'info/:id',
    component: InfoComponent
  },
  {
    path: 'battle/:id',
    component: BattleComponent
  }
];
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
