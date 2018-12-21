import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserBaseService } from 'src/app/shared/services/user-base.service';

@Component({
  selector: 'app-section-2',
  templateUrl: './section-2.component.html',
  styleUrls: ['./section-2.component.css']
})
export class Section2Component implements OnInit, OnChanges {
  submitForm: FormGroup;
  @Input() role;
  showComponent: boolean = false;
  model:{
    email:'string',
    password:'string'
  };
  emailValidation = '';
  passwordValidation = '';
  teams: string[];
  campaigns: string[];
  constructor(public fb: FormBuilder,public userService:UserBaseService) { }

  ngOnInit() {
    this.teams = ['Data Analytcs','Finance','HR','Leadership','Media','Social Media'];
    this.campaigns= ['modi-campaign','kcr-campaign','chandrababu-campaign']
    this.submitForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'description':['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'team': [''],
      'campaign': ['']
    });
  }
  ngOnChanges(){
    console.log('Section 2-role:',this.role);
    if(this.role==='Director' || this.role ==='Junior Associate'){
      this.showComponent = true;
    }
  }
  onSubmit() {
    let value = this.submitForm.value;
    console.log(value)
    this.userService.submitPost(value).subscribe(()=>{
      this.submitForm.reset();
      this.userService.eventEmitter.emit({type:'reset'})
    },
    (err)=>{

    })
  }
}
