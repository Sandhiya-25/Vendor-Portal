import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'admin-panel-layout';
  sideBarOpen = true;
  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private router : Router, private http:HttpClient,private sd:FormBuilder) { }

  showFiller = true;
  Customer:any;
  Name:any;
  Country:any;
  Address:any;
  Phone:any;
  District:any;
  Pc:any;
  
  result:any;
  inUrl:string = 'http://localhost:2000/profile'; 
  data:any;

  ngOnInit(): any{ 
    var a=localStorage.getItem("USERID")
      console.log(a);
    return this.http.post(this.inUrl,{
      
      USERID : a
      
      }).subscribe(response =>{
        
      this.data=JSON.parse(JSON.stringify(response));
       this.Customer = this.data["KUNNR"];
       this.Name = this.data["NAME1"];
       this.Country = this.data["LAND1"];
       this.Address = this.data["ADDRESS"];
       this.Phone = this.data["TELF1"];
       this.District = this.data["ORT02"];
       this.Pc = this.data["PSTLZ"]
       
       console.log(this.Address)
// console.log(this.Name);
      

   var result=this.data;
  //  console.log(result["NAME"]); 
  });
  
}


  

}



