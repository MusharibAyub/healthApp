import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, User } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  async signup(event: any) {
    const { email, password } = event.value;
    const newUser = await this.authService.signup(email, password);
    newUser.subscribe(x => this.router.navigate(['/']))
  }
}
