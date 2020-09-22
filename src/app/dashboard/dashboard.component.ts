import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  routes =  [
    { path: 'profile', label: 'Profile' , icon:'person' , color:'#f1f1f1' },
    { path: 'home', label: 'Home' , icon:'home' , color:'#f1f1f1' },
    { path: 'setting', label: 'Setting' , icon:'build', color:'#f1f1f1' },
    { path: 'add', label: 'User Add' , icon:'person', color:'#f1f1f1' }

   ];
   selectedValue : String = localStorage.getItem("current")
   profile:boolean = false;
   home:boolean = true;
   setting:boolean = false;
   city:boolean = true;
   add:boolean = false;
   length;
  constructor(private route : Router, private appService:AppService) { }

  ngOnInit(): void {
    var log = localStorage.getItem("log")
    if(log != "success"){
      this.route.navigate([''])
    }
    this.toogleClick(this.selectedValue)
  
  }

  fn = function() {
    console.log('hello');
  };

  

toogleClick(e){
  this.setting=false;
  this.home=false;
  this.profile=false;
 console.log(e)
 if(e == 'Profile'){;
   this.home = false;
   this.setting = false
   this.profile = true;
   this.city =false
   this.add = false

   localStorage.setItem("current" , "Profile")
 }
 else{
   if(e == 'Home'){
     this.setting = false
     this.profile = false;
     this.home = true
     this.city = true
     this.add = false

     localStorage.setItem("current" , "Home")


   }
   else{
     if(e== 'Setting'){
       this.profile = false;
       this.home = false
       this.setting = true
       this.city =false
       this.add = false

       localStorage.setItem("current" , "Setting")

     }
     else{
      if(e == 'User Add'){;
        this.home = false;
        this.setting = false
        this.profile = false;
        this.city =false
        this.add = true
        localStorage.setItem("current" , "User Add")
      }
     }
     
   }

 }

 
}

logout(){
 
    this.route.navigate([''])
  
}

public doSomething(data: any):void {
    this.selectedValue = 'Profile'
    this.profile = true;
    this.home = false;
    this.setting = false;
    this.city = false

}

}
