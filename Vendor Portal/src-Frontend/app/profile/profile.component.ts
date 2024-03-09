import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private sd: FormBuilder) { } 
    inUrl: string = 'http://localhost:2000/pr';
    data: any;
    resdata: any;

    ngOnInit(): any {
      var a = localStorage.getItem("USERID")
      console.log(a);
      return this.http.post(this.inUrl, { 
        USERID: a 
      }).subscribe(response => {
        this.data = JSON.parse(JSON.stringify(response));
        this.resdata = [this.data];
        console.log(this.resdata)
      });
  }
          

}
