import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthFormComponent } from './components/auth-form/auth-form.component';

import { AuthService } from './services/auth/auth.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}
