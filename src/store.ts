import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { User } from './app/auth/shared/services/auth/auth.service';
import { Meal } from './app/health/shared/services/meals/meals.service';
import { Workout } from './app/health/shared/services/workouts/workouts.service';
import { Schedule } from './app/health/shared/services/schedule/schedule.service';

export interface State {
  user: User | null,
  meals: Meal[],
  workouts: Workout[],
  date?: Date,
  schedule?: Schedule
  [key: string]: any
}

const state: State = {
  user: null,
  meals: [],
  workouts: [],
  date: undefined,
  schedule: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
