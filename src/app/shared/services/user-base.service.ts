import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ApiServiceService } from './api.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { CookieService } from './cookie.service';

@Injectable()
export class UserBaseService extends ApiServiceService {
  cookie: string;
  storage: any;
  public eventEmitter = new EventEmitter();
  
  constructor(public http: Http,public cookieService:CookieService) {
    super();
   }

 getEmitter(){
   return this.eventEmitter;
 }
  login(data :any): Observable<any>{
    return this.http.post('https://test-chandu.herokuapp.com/api/v1/login',data,this.post()).map((res)=>{
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
    return this.http.post('https://test-chandu.herokuapp.com/api/v1/submitPost',data,this.post()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  getPosts(){
    return this.http.get('https://test-chandu.herokuapp.com/api/v1/getPosts',this.get()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

  getTeamStats(){
    return this.http.get('https://test-chandu.herokuapp.com/api/v1/getTeamStats',this.get()).map((res)=>{
      console.log(res)
      return res.json()
    }).catch((error)=>{
      return new ErrorObservable(error.error);
    })
  }

}
