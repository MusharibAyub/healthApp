import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { SharedModule } from './shared/shared.module';

import { AuthGuard } from '../auth/shared/guards/auth.guard';
 
export const ROUTES: Routes = [
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule) },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule) }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule { }
