import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payage',
  templateUrl: './payage.component.html',
  styleUrls: ['./payage.component.css']
})
export class PayageComponent  implements OnInit{
  constructor(private router: Router, private http: HttpClient, private sd: FormBuilder) { } 
    inUrl: string = 'http://localhost:2000/payage';
    data: any;
    resdata: any;

    ngOnInit(): any {
      var a = localStorage.getItem ("USERID")
      console.log(a);
      return this.http.post(this.inUrl, { 
          USERID: a 
      }).subscribe(response => {
          this.data = JSON.parse(JSON.stringify(response));
          this.resdata = this.data;
          console.log(this.resdata)
      });
    }

}
