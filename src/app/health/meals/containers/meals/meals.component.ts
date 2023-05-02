import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MealsService, Meal } from 'src/app/health/shared/services/meals/meals.service';

import { Store } from 'src/store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  meals$: Observable<Meal[]> = this.store.select<Meal[]>('meals')

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.mealsService.getMeals(this.store.value.user?.id);
  }

  deleteItem(event: string) {
    this.mealsService.removeMeal(event);
  }
}
