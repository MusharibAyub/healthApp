import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  user: User | null = null;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit()
  }
}
