import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable, map } from "rxjs";

import { Store } from "src/store";
import { User } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    
    signin: Observable<boolean> = this.store.select<User | null>('user').pipe(map(x => {
        if (!x) {
            return false
        } else {
            return true
        }
    }))
    
    constructor(
        private router: Router,
        private store: Store
    ) {}


    canActivate() {
        return this.signin.pipe(map(x => {
            if(!x) {
                this.router.navigate(['/auth/login']);
            }
            return x;
        }))
    }
}