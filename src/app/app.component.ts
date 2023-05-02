import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/store';

import { AuthService, User } from './auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user$: Observable<User | null> = new Observable<User | null>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.store.select<User | null>('user')
    const user = localStorage.getItem('user')
    if (user) {
      this.store.set('user', JSON.parse(user))
    }
  }

  async onLogout() {
    this.authService.signOut();
    this.router.navigate(['/auth/login'])
  }
}
