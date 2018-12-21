import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserBaseService } from 'src/app/shared/services/user-base.service';

@Component({
  selector: 'app-section-1',
  templateUrl: './section-1.component.html',
  styleUrls: ['./section-1.component.css']
})
export class Section1Component implements OnInit, OnChanges {
  @Input() role;
  showComponent: boolean = false;
  posts: any=[];
  p:Number=1;
  constructor(public userService:UserBaseService) { 
    this.userService.getEmitter().subscribe((data)=>{
      console.log(data)
      if(data.type == 'reset'){
        this.getPosts();
      }
    })
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log('Section 1-role:',this.role)
    if(this.role==='Director' || this.role ==='Senior Associate'){
      this.showComponent = true;
    }
    this.getPosts();
  }
  getPosts(){
    this.userService.getPosts().subscribe((response)=>{
      this.posts=response.posts? response.posts.reverse():'';
    },(error)=>{

    })
  }
}
