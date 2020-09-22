﻿import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { UserAdd } from '../model';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Input() function: any;
  form: FormGroup;
  formImage: FormGroup;
  loading = false;
  submitted = false;
  response;
  imageURL;
  dob;
  imgValue=1;
  UserAdd = new UserAdd('','','','','','')


  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private appService:AppService
      
  ) { }

  ngOnInit() {
    this.formImage = this.formBuilder.group({
      profile: [''],
    });
      this.form = this.formBuilder.group({
        first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', Validators.required],
          mobile_number: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      // reset alerts on submit

      // stop here if form is invalid
      if (this.form.invalid) {
          return
      }
      else{
        var date = new Date().getFullYear
        var dateMonth = new Date().getMonth
        var c_date = this.form.get('dob').value
        this.UserAdd.dob = c_date
        this.UserAdd.first_name = this.form.get('first_name').value
        this.UserAdd.last_name = this.form.get('last_name').value
        this.UserAdd.email = this.form.get('email').value
        this.UserAdd.password = this.form.get('password').value
        this.UserAdd.mobile_number = this.form.get('mobile_number').value

        console.log(c_date)
        var d = c_date.split('-')
        console.log(d[0])
        if(d[0] <= date ){
          if(d[1] <= dateMonth){
            this.appService.postProfile(this.UserAdd).subscribe(data=>{
              console.log(data)
              if(data[0].status == 201){
                if(this.imgValue == 0){
                  this.onSubmitImage()
                }
                else{
                  alert("User added successfully without Profile Image")
                  console.log('success')
                  location.reload()
                }
              }
            })

          }
          else{
            alert("Check the dob")
          }
        }
        else{
          alert("Check the dob")

        }
        // if()
        // this.UserAdd.first_name = this.form.controls

      }

      // this.loading = true;
      
  }

  onChange(event , e) {
    this.imgValue = e
    console.log(event[0])
    if (event.length > 0) {
      const file = event[0];
      this.formImage.get('profile').setValue(file);
    }
  }

  onSubmitImage() {
    console.log("Photo")
    const formData = new FormData();
    formData.append('file', this.formImage.get('profile').value);
    formData.append('mobile_number', this.form.get('mobile_number').value);

    this.appService.ImageUpload(formData).subscribe(result=>{
      console.log(result)
      alert("User added successfully  with Profile Image")
      location.reload()


    })

    // this.uploadService.upload(formData).subscribe(
    //   (res) => {
    //     this.response = res;
    //     this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
    //     console.log(res);
    //     console.log(this.imageURL);
    //   },
    //   (err) => {  
    //     console.log(err);
    //   }
    // );
  }
}