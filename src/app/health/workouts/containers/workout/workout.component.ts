import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, switchMap, of } from 'rxjs';

import { Store } from 'src/store';

import { WorkoutsService, Workout } from 'src/app/health/shared/services/workouts/workouts.service';


@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  new = true;

  workout$: Observable<any> | null = null; 

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.workout$ = this.route.params.pipe(switchMap((id: any) => {
      if(id.id) {
        return this.workoutsService.getWorkout(this.store.value.user?.id, id.id)
      } else {
        return of([])
      }
    }))
  }
   
  addWorkout(event: any) {
    const result = this.workoutsService.addWorkout(event.name, event.ingredients, this.store.value.user?.id);
    if(result) {
      this.router.navigate(['/workouts']);
    } else {
      console.log('oops')
    }
  }

  updateWorkout(event: Workout) {
    this.workoutsService.updateWorkout(event)
  }

  removeWorkout(id: string) {
    this.workoutsService.removeWorkout(id);
    this.router.navigate(['/workouts'])
  }
}
