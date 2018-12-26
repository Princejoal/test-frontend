import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBaseService } from '../shared/services/user-base.service';
import { CookieService } from '../shared/services/cookie.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public inputType: string = 'password';
  userForm: FormGroup;
  errorMessage: boolean = false
  isLoginError: boolean = false;
  constructor(public fb: FormBuilder, public userbaseService: UserBaseService, public cookieService: CookieService, public router: Router) { }

  ngOnInit() {
    this.formGroupBulid()
  }
  formGroupBulid() {
    this.userForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  onSubmit() {
    console.log("User Details onSubmit Login page : ", this.userForm.value)
    this.errorMessage = false;
    this.userbaseService.login(this.userForm.value).subscribe((response) => {
      if (response.success) {
        let storage = {
          token: response.token
        }
        this.cookieService.createCookie('storage', JSON.stringify(storage), 3);
        this.router.navigateByUrl('/dashboard')
      } else {
        this.isLoginError = true;
      }
    })
  }

  tooglepwd() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else if (this.inputType === 'text') {
      this.inputType = 'password';
    }
  }
}
