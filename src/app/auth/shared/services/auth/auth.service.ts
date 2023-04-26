import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from 'src/store';
import { Observable, map } from 'rxjs';

export interface User {
    email: string,
    password: boolean
    id: string,
}

export const Api: string = 'http://localhost:3000/users'

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private store: Store
    ) { }

    signup(email: string, password: string): Observable<any> {
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = { email: email, password: password }

        const newUser = this.http.post<any>(Api, data, { headers: header })
        this.store.set('user', newUser)
        return newUser
    }

    signOut() {
        this.store.set('user', null);
    }

    signin(email: string, password: string): Observable<any> | null {
        const user = this.http.get<any[]>(`${Api}?email=${email}&password=${password}`)
        return user.pipe(map( x => {
            if(x.length > 0) {
                this.store.set('user', x[0])
                return x[0]
            } else {
                this.store.set('user', null)
                return null
            }
        }))
    }
}