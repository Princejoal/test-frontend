import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { UserBaseService } from 'src/app/shared/services/user-base.service';

declare var document:any
@Component({
  selector: 'app-section-3',
  templateUrl: './section-3.component.html',
  styleUrls: ['./section-3.component.css']
})
export class Section3Component implements OnInit, OnChanges, AfterViewInit {
  @Input() role;
  showComponent: boolean = false;
  chart: any=[];
  lat: number = 17.3850; 
  lng: number = 78.4867;

  constructor(public userService:UserBaseService) {
    this.userService.getEmitter().subscribe((data)=>{
      console.log(data)
      if(data.type == 'reset'){
        this.getTeamStats();
      }
    })
   }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat=position.coords.latitude;
        this.lng=position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  ngAfterViewInit(){
    this.getTeamStats();
  }

  ngOnChanges(){
    console.log('Section 3-role:',this.role)
    if(this.role==='Director' || this.role ==='Senior Associate' || this.role==='Associate'){
      this.showComponent = true;
    }
  }

  getTeamStats() {
    this.userService.getTeamStats().subscribe((response)=>{
      console.log(document.getElementById("myChart"))
      const ctx = document.getElementById("myChart");
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Data Analytcs-organizations','Finance-organizations','HR-organizations','Leadership-organizations','Media-organizations','Social Media-organizations'],
          datasets: [{
            data:response.teamStats,
            backgroundColor: ["#DC143C","#F4A460", "#FF69B4","#7FFFD4","#FF4500", "#1E90FF"],
            borderColor: "#e8c3b9",
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Registered Team Organizations for campaigns'
          }
        }
      });
    },
    (err)=>{

    })
  }
}
