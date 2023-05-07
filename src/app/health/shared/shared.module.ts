import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ListItemComponent } from './components/list-item/list-item.component';

import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return{
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    }
  }
}
