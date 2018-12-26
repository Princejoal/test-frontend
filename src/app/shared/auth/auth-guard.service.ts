import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenGuardService } from './token-guard.service';
import { UserBaseService } from '../services/user-base.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router,public token: TokenGuardService, public userService:UserBaseService) {}
  async canActivate(): Promise<boolean> {
    if (!await this.token.tokenValidation()) {
      this.userService.logout();
      this.router.navigate(['login']);
      return false;
    }else if (!await this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}