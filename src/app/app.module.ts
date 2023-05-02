import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { Store } from 'src/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/schedule' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HealthModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
