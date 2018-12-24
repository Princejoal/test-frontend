import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CookieService } from '../shared/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  cookie: any;
  storage: any;
  role: any;
  isCollapsed = false;
  triggerTemplate = null;
  noAccess = false
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  showSection: string;
  constructor(public cookieService:CookieService, public router :Router) { }

  ngOnInit() {
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    this.role = this.storage.user ? this.storage.user.role : '';
  }
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  home() {
    this.showSection = null;
  }
  foo(section) {
    this.noAccess = false;
    switch (section) {
      case 'section-1' :
        (this.role==='Director' || this.role ==='Senior Associate') && (this.showSection = 'section-2');
        (this.role==='Director' || this.role ==='Senior Associate') || (this.noAccess = true) && (this.showSection=null);
        break;
      case 'section-2':
        (this.role==='Director' || this.role ==='Junior Associate')  && (this.showSection = 'section-1');
        (this.role==='Director' || this.role ==='Junior Associate') || (this.noAccess = true) && (this.showSection=null);;
        break;
        case 'section-3':
        (this.role==='Director' || this.role ==='Senior Associate' || this.role==='Associate')  && (this.showSection = 'section-3');
        (this.role==='Director' || this.role ==='Senior Associate' || this.role==='Associate') || (this.noAccess = true) && (this.showSection=null);;
        break;
    }
    console.log(this.showSection,this.noAccess)
    // if(section === 'section-1'){
    //   if (this.role==='Director' || this.role ==='Senior Associate') {
    //     this.showSection = 'section-1';
    //   } else {
    //     this.noAccess = true;
    //   }
    // } else if(section === 'section-2'){
    //   if (this.role==='Director' || this.role ==='Junior Associate') {
    //     this.showSection = 'section-2';
    //   } else {
    //     this.noAccess = true;
    //   }
    // } else if(section === 'section-3'){
    //   if (this.role==='Director' || this.role ==='Senior Associate' || this.role==='Associate') {
    //     this.showSection = 'section-3';
    //   } else {
    //     this.noAccess = true;
    //   }
    // }
  }

}
