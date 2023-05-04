import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { WorkoutsService, Workout } from 'src/app/health/shared/services/workouts/workouts.service';

import { Store } from 'src/store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]> = this.store.select<Workout[]>('workouts')

  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.workoutsService.getWorkouts(this.store.value.user?.id);
  }

  deleteItem(event: string) {
    this.workoutsService.removeWorkout(event);
  }
}
