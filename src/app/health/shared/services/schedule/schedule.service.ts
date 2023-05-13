import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Store } from "src/store";

import { BehaviorSubject, Observable, map, switchMap, tap, of } from "rxjs";

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
            this.getSchedule().subscribe();
        })
    );

    constructor(
        private store: Store,
        private http: HttpClient
    ) {}

    updateDate(date: Date) {
        this.date$.next(date);
    }

    getSchedule() {
        // console.log('GetSchedule Called')
        return this.http.get<any[]>(`${scheduleApi}?userId=${this.store.value.user?.id}&date=${this.store.value.date?.toISOString()}`)
            .pipe(map((res: any) => {
                // console.log('getSchdule Response', res)
                if(res.length > 0) {
                    this.store.set('schedule', res[0]);
                    return res[0];
                } else {
                    const data = {
                        userId: this.store.value.user?.id,
                        date: this.store.value.date
                    };
                    this.store.set('schedule', data);
                    return null;
                }
            }))
    }

    update(data: any) {
        // console.log('data Received', data)
        return this.http.get<any[]>(`${scheduleApi}?userId=${this.store.value.user?.id}&date=${this.store.value.date?.toISOString()}`)
            .pipe(switchMap((res: any) => {
                // console.log('response from first Api call', res)
                if(res.length > 0) {
                    if(data.section in res[0]) {
                        const newData = { [data.section]: Object.assign(res[0][data.section], { [data.type]: data.assigned }) }
                        // console.log('data send in case 1', newData) 
                        return this.updateold(newData, res[0].id).pipe(tap((mapRes: any) => {
                            // console.log('data received in case 1', mapRes)
                            this.store.set('schedule', mapRes)
                        }))
                    } else {
                        const newData = { [data.section]: { [data.type]: data.assigned } }
                        // console.log('data send in case 2', newData) 
                        const response = this.updateold(newData, res[0].id);
                        return response.pipe(tap((mapRes: any) => {
                            // console.log('data received in case 2', mapRes)
                            this.store.set('schedule', mapRes)
                        }));
                    }
                } else {
                    const newData = {userId: this.store.value.user?.id, date: this.store.value.date?.toISOString(), [data.section]: { [data.type]: data.assigned }}
                    // console.log('data send in case 3', newData)
                    const response = this.addnew(newData);
                    return response.pipe(tap((mapRes: any) => {
                        // console.log('data received in case 3', mapRes)
                        this.store.set('schedule', mapRes)
                    }));
                }
            }))
    }

    addnew(data: any) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Schedule>(scheduleApi, data, { headers: header })
    }

    updateold(data: any, id: string) {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.patch<Schedule>(`${scheduleApi}/${id}`, data, { headers: header })
    }
}