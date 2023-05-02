import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'

import { Store } from "src/store";

export interface Meal {
    id: string,
    name: string,
    ingredients: string[],
    userId: string
}

export const mealsApi: string = 'http://localhost:3000/meals'

@Injectable()
export class MealsService {
    constructor(
        private http: HttpClient,
        private store: Store
    ) {}
    
    getMeals(id: string | undefined) {
        if(id){
            const meal = this.http.get<Meal[]>(`${mealsApi}?userId=${id}`);
            meal.subscribe(x => this.store.set('meals', x))
        }
    }

    getMeal(uid: string | undefined, id:string) {
        return this.http.get<Meal>(`${mealsApi}?userId=${uid}&id=${id}`)
    }

    addMeal(name: string, ingredients: string[], userId: string | undefined): Observable<Meal> | null {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        if(userId) {
            const data = {name: name, ingredients: ingredients, userId: userId};
            const newMeal = this.http.post<Meal>(mealsApi, data, {headers: header});
            newMeal.subscribe((x: Meal) => {
                const meals = [...this.store.value.meals, x];
                this.store.set('meals', meals)
            })
            return newMeal        
        }
        return null
    }

    removeMeal(id: string) {
        this.http.delete(`${mealsApi}/${id}`).subscribe((response: any) => {
            const meals: Meal[] = this.store.value.meals
            const updatedMeals = meals.filter(meal => meal.id !== id)
            this.store.set('meals', updatedMeals)    
        },(error: any) => {
            console.log(error)
        }
        )    
    }

    updateMeal(meal: Meal) {
        console.log(meal)
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put<Meal>(`${mealsApi}/${meal.id}`, meal, { headers: header }).subscribe(meal => {
            console.log(meal)
            const meals = this.store.value.meals;
            const updatedMeals = meals.filter(x => x.id !== meal.id).push(meal)
            this.store.set('meals', updatedMeals)
        })
    }
}