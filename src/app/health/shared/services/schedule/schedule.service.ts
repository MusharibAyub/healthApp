import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Store } from "src/store";

import { BehaviorSubject, Observable, map, tap } from "rxjs";

export interface scheduleDetail {
    meals?: string[],
    workouts?: string[]
}

export interface Schedule {
    id?: string,
    userId: string,
    date: Date
    morning?: scheduleDetail,
    lunch?: scheduleDetail,
    evening?: scheduleDetail,
    snack?: scheduleDetail,
    [key:string]: any
}

export const scheduleApi: string = 'http://localhost:3000/schedule'

@Injectable()
export class ScheduleService {
    
    private date$ = new BehaviorSubject(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0));

    schedule$: Observable<any> = this.date$.pipe(
        tap((next: any) => {
            this.store.set('date', next);
            const response = this.getSchedule(next)
            if(!response) {
                const data = {
                    userId: this.store.value.user?.id,
                    date: next
                }
                this.store.set('schedule', data);
            } else {
                this.store.set('schedule', response);
            }
        })
    );

    constructor(
        private store: Store,
        private http: HttpClient
    ) {}

    updateDate(date: Date) {
        this.date$.next(date);
    }

    getSchedule(date: Date) {
        let response:Schedule | null = null;
        this.http.get<any[]>(`${scheduleApi}?userId=${this.store.value.user?.id}&date=${date}`)
            .pipe(tap((res: any) => {
                if(res.length > 0) {
                    response = res[0]
                } else {
                    response = null
                }
            }))
        return response
    }

    update(data: Schedule) {
        console.log(data, 'start of update service')
        this.http.get<any[]>(`${scheduleApi}?userId=${this.store.value.user?.id}&date=${data.date}`)
            .pipe(tap((res: any) => {
                if(res.length > 0) {
                    this.updateold(data, res[0].id).subscribe((schedule: Schedule) => {
                        this.store.set('schedule', schedule);
                    });
                } else {
                    this.addnew(data).subscribe((schedule: Schedule) => {
                        this.store.set('schedule', schedule);
                    });
                }
            }))
    }

    addnew(data: Schedule) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Schedule>(scheduleApi, data, { headers: header })
    }

    updateold(data: Schedule, id: string) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.patch<Schedule>(`${scheduleApi}/${id}`, data, { headers: header })
    }
}