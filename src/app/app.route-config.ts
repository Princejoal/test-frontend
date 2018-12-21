import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {  AuthGuardService as AuthGuard } from './shared/auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
export const routerConfig: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'logout',
        component:LogoutComponent,
        canActivate:[AuthGuard]
    }
];
