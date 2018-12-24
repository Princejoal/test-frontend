import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routerConfig } from './app.route-config';
import { Section1Component } from './components/section-1/section-1.component';
import { Section2Component } from './components/section-2/section-2.component';
import { Section3Component } from './components/section-3/section-3.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './shared/auth/auth.service';
import { ApiServiceService } from './shared/services/api.service';
import { CookieService } from './shared/services/cookie.service';
import { UserBaseService } from './shared/services/user-base.service';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import {AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    DashboardComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(routerConfig),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDZJVKjIZlbJd7rCgS8hyGV-ija8z11tjo'
    }),
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,AuthGuardService,ApiServiceService,CookieService,UserBaseService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
