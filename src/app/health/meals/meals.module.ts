import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MealFormComponent } from './components/meal-form/meal-form.component';

import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent }
]

@NgModule({
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule { }
