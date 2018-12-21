import { Component, OnInit } from '@angular/core';
import { CookieService } from './shared/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frntend';
  cookie: any;
  storage: any;
  constructor(public cookieService:CookieService,public router:Router){}
  ngOnInit(){
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    const url = window.location.href;
    const routeObject = url.split('/');
    if(this.cookie!==null && this.storage.token && routeObject[3] !== 'logout') {
      this.router.navigateByUrl('/dashboard')
    } 
    if(this.cookie ===null && routeObject[3] === 'logout'){
      this.router.navigateByUrl('/')
    }
  }
}
