import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Customer= new Customer();
  request= { "firstName":'', 
            "lastName": '',
            "password" : '',
            "username": ''
  }
  customer: Customer[]=[];
  result = {
    "status" :'',
    "message": '',
  }

  constructor(private _router:Router, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  register(){
    this.request['username']=this.user.username;
    this.request['password']=this.user.password;
    this.request['firstName']=this.user.firstName;
    this.request['lastName']=this.user.lastName;
    console.log(this.request);
    this._httpClient.post<JSON>("http://localhost:3000/users/register",this.request).subscribe( result => {
      this.result['status']= result['status']
      this.result['message']= result['message']
      if(this.result['status']=='success'){
        alert("Registered successfully");
      this._router.navigate(['login']);
      }
      else{
        alert("Registration failed because email already exists, try again");
      }; 
      }, error => {console.log(error)});
      
  }

}
