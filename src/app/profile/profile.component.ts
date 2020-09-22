import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { modelID, UserEdit } from '../model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'MobileNumber','dob','email', 'action'];
  dataSource;
  userDetail;
  condition: string;
  state:string;
  id;
  constructor(private appService:AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.getProfile().subscribe(data=>{
      this.dataSource = data[0].data[0]
    })
  }

  updateCall(e){
    const dialogRef =this.dialog.open(ProfileEditComponent, {
      height: '500px',
      width: '400px',
      data: {
        dataSource: e
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);
        if(result == 1){
          alert("User updated successfully")
        }
        else{
          
        }
    });
  

  }

  
  viewCall(e){
    this.dialog.open(ProfileViewComponent, {
      data: {
        dataSource: e
      }
    });
  }

  

  deleteCall(e){
    this.id = parseInt(e)
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.deleteCondition(e)
      }
      

    });
  }

  deleteCondition(e){
    console.log(this.id)
    this.appService.deleteProfile(this.id).subscribe(data=>{
      console.log(data)
      location.reload()
    })
  }
}

  @Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
  })
  export class DialogComponent {}




  @Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',

  })
  export class ProfileViewComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public dataSource:ProfileComponent , private appService:AppService) {}
    userDetails;
    imgUrl;
    ngOnInit(): void {
      var id = this.dataSource.dataSource
      this.appService.getProfileId(id).subscribe(data=>{
        this.userDetails = data[0].data[0]
        console.log(this.userDetails.mobile_number)
        this.appService.getImageUpload(this.userDetails.mobile_number).subscribe(data=>{
          console.log(data)
          this.imgUrl ='http://127.0.0.1:8000' + data[0].file
          console.log(this.imgUrl)
        })
      })
    }
  

  }


  @Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']

  })
  export class ProfileEditComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public dataSource: ProfileComponent,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private appService:AppService) {}
    form: FormGroup;
    formImage: FormGroup;
    loading = false;
    submitted = false;
    response;
    imageURL;
    imgCon=false;
    userDetails;
    imgUrl;
    dob;
    imgValue=1;
    imagePath;
    imgURL;
    success:boolean = false;
    UserEdit = new UserEdit('','','','','','','')
  
 
  
    ngOnInit() {
      this.formImage = this.formBuilder.group({
        profile: [''],
      });
        this.form = this.formBuilder.group({
          id: [''],
          first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            dob: ['', Validators.required],
            email: ['', Validators.required],
            mobile_number: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        var id = this.dataSource.dataSource
        this.appService.getProfileId(id).subscribe(data=>{
          this.userDetails = data[0].data[0]
          this.form.get('id').setValue(this.userDetails.id)
          this.form.get('first_name').setValue(this.userDetails.first_name)
          this.form.get('last_name').setValue(this.userDetails.last_name)
          this.form.get('dob').setValue(this.userDetails.dob)
          this.form.get('email').setValue(this.userDetails.email)
          this.form.get('mobile_number').setValue(this.userDetails.mobile_number)
          this.form.get('password').setValue(this.userDetails.password)


          console.log(this.userDetails.mobile_number)
          this.appService.getImageUpload(this.userDetails.mobile_number).subscribe(data=>{
            console.log(data)
            this.imgUrl ='http://127.0.0.1:8000' + data[0].file
            console.log(this.imgUrl)
          })
        })
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  
    onSubmitEdit() {
        this.submitted = true;
  
        if (this.form.invalid) {
            return
        }
        else{
          var date = new Date().getFullYear
          var dateMonth = new Date().getMonth
          var c_date = this.form.get('dob').value
          this.UserEdit.dob = c_date
          this.UserEdit.id = this.form.get('id').value
          this.UserEdit.first_name = this.form.get('first_name').value
          this.UserEdit.last_name = this.form.get('last_name').value
          this.UserEdit.email = this.form.get('email').value
          this.UserEdit.password = this.form.get('password').value
          this.UserEdit.mobile_number = this.form.get('mobile_number').value
  
          console.log(c_date)
          var d = c_date.split('-')
          console.log(d[0])
          if(d[0] <= date ){
            if(d[1] <= dateMonth){
              this.appService.putProfile(this.UserEdit).subscribe(data=>{
                console.log(data)
                if(data[0].status == 201){
                    this.success = true
                    alert("User data uploaded successfully ")
                    console.log('success')
                    this.onNoClick(1)
                  
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
        
        }
  
        
    }

    onNoClick(e): void {
      this.dialogRef.close(e);
    }
  
   
  }

