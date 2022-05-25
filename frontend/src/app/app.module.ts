// ------------------- Imports --------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ------------------------------------------------


// --------------- Custom Components --------------
import { AppComponent } from './app.component';
// ------------------------------------------------


// ---------------- Custom Modules ----------------
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
// ------------------------------------------------


// --------------------- Main ---------------------
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// ------------------------------------------------
