import { Component, OnInit } from '@angular/core';
import { CookieService } from '../shared/services/cookie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cookie: any;
  storage: any;
  role: any;

  constructor(public cookieService:CookieService) { }

  ngOnInit() {
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    this.role = this.storage.user ? this.storage.user.role : '';
  }

}
