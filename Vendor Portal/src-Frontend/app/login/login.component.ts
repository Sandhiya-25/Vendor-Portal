import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
    constructor(private router: Router, private http:HttpClient, private sd:FormBuilder) { } 
    //grouping of customerid and password defined in .html as user
    loginForm = this.sd.group({ userid: [''], password: [''] })
    
     ngOnInit(): void {}
     inUrl:string = 'http://localhost:2000/user'; 
     data: any;
     log() { 
      this.Login(this.loginForm.value.userid, 
      this.loginForm.value.password) 
      } 

    
     Login(userid: any, password: any) 
    { 
      console.log(userid);
      //console.log(password);
      //assigning customerid to USERID and password to PASSWORD 
      //these USERID and PASSWORD variables will be used in server.js for retrieving 
      return this.http.post(this.inUrl, { USERID: userid, PASSWORD: password })
      .subscribe( response => { this.data = JSON.parse(JSON.stringify(response));
        console.log(response); 
        var Result = this.data;
        if(Result === '"1"')
           { 
            alert("Logged Successfully");
            localStorage.setItem("USERID",userid);
            var v = localStorage.getItem("USERID");
            console.log(v);
            this.router.navigate(['/dashboard']);
           }
            else
             {
              alert("Something is wrong!!");
              }
             } );
             }
     }


