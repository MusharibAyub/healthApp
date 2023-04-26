import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { SharedModule } from './shared/shared.module';

const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterModule) },
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        HttpClientModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule { }