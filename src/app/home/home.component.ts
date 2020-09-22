import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  length;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.getProfile().subscribe(data=>{
      this.length = data[0].data[0].length
      console.log(this.length)
      console.log(data)
    })
  }

}
