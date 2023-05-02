import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Observable, map } from 'rxjs';

import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Store } from 'src/store';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnChanges{

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

  meal$: Observable<Meal> | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data && this.data.length > 0) {
      const meal = this.data[0]
      this.exists = true

      this.form.patchValue(meal)

      this.emptyIngredients()

      if(meal.ingredients) {
        for(const item of meal.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      } 
    }
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0)
    }
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }
  
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal () {
    if(this.form.valid){
      this.create.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.data[0].id);
  }

  updateMeal() {
    if(this.form.valid){
      const data = {
        id: this.data[0].id,
        userId: this.data[0].userId,
        name: this.form.value.name,
        ingredients: this.form.value.ingredients
      }
      this.update.emit(data);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
