import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login(form: any){
    const { email, password } = form.value;
    const user = await this.authService.signin(email, password);
    user?.subscribe(x => {
      if(x) {
        this.router.navigate(['/']);
      } else {
        this.error = "Incorrect Username or Password"
      }
    })
   
  }

}
