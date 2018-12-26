import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ApiServiceService } from './api.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { CookieService } from './cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserBaseService extends ApiServiceService {
  cookie: string;
  storage: any;
  public eventEmitter = new EventEmitter();
  jwtHelper: JwtHelperService;
  
  constructor(public http: Http,public cookieService:CookieService) {
    super();
    this.jwtHelper=new JwtHelperService();
   }

  getEmitter(){
    return this.eventEmitter;
  }

  verifyToken(data) {
    return this.http.post('http://localhost:3000/api/v1/verifyToken',data,this.post()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  decodeToken(token: string){
    console.log(this.jwtHelper.decodeToken(token))
    return this.jwtHelper.decodeToken(token);
  }

  login(data :any): Observable<any>{
    return this.http.post('http://localhost:3000/api/v1/login',data,this.post()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  logout(){
    this.cookie = this.cookieService.readCookie('storage');
    this.storage = this.cookie != null ? JSON.parse(this.cookie) : '';
    if(this.cookie!==null && this.storage.token) {
      this.cookieService.eraseCookie('storage');
      return true;
    }
    return false;
  }

  submitPost(data){
    return this.http.post('http://localhost:3000/api/v1/submitPost',data,this.post()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  getPosts(){
    return this.http.get('http://localhost:3000/api/v1/getPosts',this.get()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  getTeamStats(){
    return this.http.get('http://localhost:3000/api/v1/getTeamStats',this.get()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

}
