import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { login } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email = "";
  Password = "";
  loginDetails = new login('','')

  constructor(private appService:AppService, private route:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('log')
    localStorage.setItem("current", "Home")
  }

  submit(){
    if(this.Email != ""){
      if(this.Password != ""){
        this.loginDetails.email = this.Email;
        this.loginDetails.password = this.Password;

    this.appService.login(this.loginDetails).subscribe(data=>{
      console.log(data)
      if(data[0].message == "success"){
        console.log(data[0])
        localStorage.setItem("log", "success");
        this.route.navigate(['dashboard']);

      }
      else{
        alert(data[0].message)
      }
    })

      }
      else{
        alert("Enter the Mobile Number")

      }

    }
    else{
      alert("Enter the Email Address")
    }
    
  }

 

}
