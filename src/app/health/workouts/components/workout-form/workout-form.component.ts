import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Observable, map } from 'rxjs';

import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';
import { Store } from 'src/store';

@Component({
  selector: 'app-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnChanges{

  toggled = false;
  exists =false

  @Input()
  data : any = null;

  @Output()
  create = new EventEmitter<any>
  
  @Output()
  update = new EventEmitter<any>
  
  @Output()
  remove = new EventEmitter<any>

  workout$: Observable<Workout> | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  get placeholder () {
    return `eg. ${this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'}`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data && this.data.length > 0) {
      const workout = this.data[0]
      this.form.patchValue(workout)
      this.exists = true
  
    }
  }
  createWorkout () {
    if(this.form.valid){
      this.create.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.data[0].id);
  }

  updateWorkout() {
    if(this.form.valid){
      this.update.emit(this.form.value);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
