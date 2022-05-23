// ------------------- Default --------------------
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ------------------------------------------------


// -------------------- Paths ---------------------
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(page => page.PagesModule)
  }
];
// ------------------------------------------------


// ---------------- Main Function -----------------
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
