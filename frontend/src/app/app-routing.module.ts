// ------------------- Imports --------------------
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ------------------------------------------------


// ----------------- Route Config -----------------
const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/pages.module')
                      .then(page => page.PagesModule)
}];
// ------------------------------------------------


// --------------------- Main ---------------------
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// ------------------------------------------------
