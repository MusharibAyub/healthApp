import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, switchMap, of } from 'rxjs';

import { Store } from 'src/store';

import { MealsService, Meal } from 'src/app/health/shared/services/meals/meals.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  new = true;

  meal$: Observable<any> | null = null; 

  constructor(
    private mealsService: MealsService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.meal$ = this.route.params.pipe(switchMap((id: any) => {
      if(id.id) {
        return this.mealsService.getMeal(this.store.value.user?.id, id.id)
      } else {
        return of([])
      }
    }))
  }
   
  addMeal(event: any) {
    const result = this.mealsService.addMeal(event.name, event.ingredients, this.store.value.user?.id);
    if(result) {
      this.router.navigate(['/meals']);
    } else {
      console.log('oops')
    }
  }

  updateMeal(event: Meal) {
    this.mealsService.updateMeal(event)
  }

  removeMeal(id: string) {
    this.mealsService.removeMeal(id);
    this.router.navigate(['/meals'])
  }
}
