import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'

import { Store } from "src/store";

export interface Workout {
    id: string,
    name: string,
    type: string,
    strength: any,
    endurance: any,
    userId: string
}

export const workoutsApi: string = 'http://localhost:3000/workouts'

@Injectable()
export class WorkoutsService {
    constructor(
        private http: HttpClient,
        private store: Store
    ) {}
    
    getWorkouts(id: string | undefined) {
        if(id){
            const workout = this.http.get<Workout[]>(`${workoutsApi}?userId=${id}`);
            workout.subscribe(x => this.store.set('workouts', x))
        }
    }

    getWorkout(uid: string | undefined, id:string) {
        return this.http.get<Workout>(`${workoutsApi}?userId=${uid}&id=${id}`)
    }

    addWorkout(name: string, ingredients: string[], userId: string | undefined): Observable<Workout> | null {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        if(userId) {
            const data = {name: name, ingredients: ingredients, userId: userId};
            const newWorkout = this.http.post<Workout>(workoutsApi, data, {headers: header});
            newWorkout.subscribe((x: Workout) => {
                const workouts = [...this.store.value.workouts, x];
                this.store.set('meals', workouts)
            })
            return newWorkout        
        }
        return null
    }

    removeWorkout(id: string) {
        this.http.delete(`${workoutsApi}/${id}`).subscribe((response: any) => {
            const workouts: Workout[] = this.store.value.workouts
            const updatedWorkouts = workouts.filter(workout => workout.id !== id)
            this.store.set('workouts', updatedWorkouts)    
        },(error: any) => {
            console.log(error)
        }
        )    
    }

    updateWorkout(workout: Workout) {
        console.log(workout)
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put<Workout>(`${workoutsApi}/${workout.id}`, workout, { headers: header }).subscribe(workout => {
            console.log(workout)
            const workouts = this.store.value.workouts;
            const updatedWorkouts = workouts.filter(x => x.id !== workout.id).push(workout)
            this.store.set('workouts', updatedWorkouts)
        })
    }
}