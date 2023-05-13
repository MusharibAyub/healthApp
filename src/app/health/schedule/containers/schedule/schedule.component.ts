import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/store';

import { Schedule, ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy{
  
  date$: Observable<Date> = new Observable<Date>;
  schedule$: Observable<Schedule> = new Observable<Schedule>; 
  meals$ = new Observable<Meal[]>;
  workouts$ = new Observable<Workout[]>;
  
  subscription: Subscription[] = [];

  assign = {
    open: false,
    type: '', 
    assigned: [''], 
    section: ''
  };

  constructor(
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.meals$ = this.store.select<Meal[]>('meals');
    this.workouts$ = this.store.select<Workout[]>('workouts');

    this.mealsService.getMeals(this.store.value.user?.id);
    this.workoutsService.getWorkouts(this.store.value.user?.id);

    this.subscription = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.getSchedule().subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  get list(): Observable<any> {
      if(this.assign.type === 'meals') {
        return this.meals$;
      } else {
        return this.workouts$;
      }
  }

  changeDate(date :Date) {
    this.scheduleService.updateDate(date);
  }

  select({type, assigned, section}:{type: string, assigned: string[], section: string}) {
    this.assign.type = type;
    this.assign.assigned = assigned;
    this.assign.section = section;
    this.assign.open = true
  }

  onCancel() {
    this.assign.type = '';
    this.assign.assigned = [];
    this.assign.section = '';
    this.assign.open = false;
  }

  onUpdate(data: any) {
    this.scheduleService.update(data).subscribe((x: any) => console.log(x));
  }
}
