import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from '../services/cookie.service';
import { UserBaseService } from '../services/user-base.service';

@Injectable()
export class TokenGuardService implements OnInit {

    constructor(public auth: AuthService, 
        public router: Router, 
        public cookieService: CookieService, 
        public userService: UserBaseService) 
        { }
    ngOnInit() {
        this.tokenValidation();
    }
    async tokenValidation() {
        let storage = JSON.parse(this.cookieService.readCookie('storage'));
        let data = {
            token: storage.token
        }
        let verify = await this.userService.verifyToken(data).toPromise();
        return verify.verified;
    }

}