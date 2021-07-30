import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any={
    usermail:'',
    password:''
  };
  request={ "username":'', 
            "password": ''}
  customer: Customer[]=[];

  result = {
    "status" :'',
    "message": '',
    "type" : '',
    "_id": '',
    "firstName":''
  }

  constructor(private _router: Router, private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    if(this.request['username']=='admin' && this.request['password']=="admin"){
      window.localStorage.setItem('userid','admin');
    window.localStorage.setItem('type','admin');
    window.localStorage.setItem('firstName','admin');
    localStorage.setItem('isLoggedIn','true');
      alert("Logged in successfully");
      this._router.navigate(['/admin/manageprod']);
    }
    else{
    this._httpClient.post<JSON>("http://localhost:3000/users/login",this.request).subscribe( result => {
    this.result['status']= result['status']
    this.result['message']= result['message']
    this.result['type']= result['type']
    this.result['_id']= result['_id']
    this.result['firstName']=result['firstName']

    
    if(this.result['status']=='success'){
      if(this.result['type']=='user'){
    window.localStorage.setItem('userid',this.result['_id']);
    window.localStorage.setItem('type',this.result['type']);
    window.localStorage.setItem('firstName',this.result['firstName']);
    window.localStorage.setItem('userid-orders',result['username']);
    window.localStorage.setItem('isLoggedIn','true');
      alert("Logged in successfully");
      console.log(result);
      this._router.navigate(['/carousel']);
      }
      else if(this.result['type']=='admin'){
        window.localStorage.setItem('userid',this.result['id']);
    window.localStorage.setItem('type',this.result['type']);
    window.localStorage.setItem('userid-orders',result['username']);
    window.localStorage.setItem('isLoggedIn','true');
      alert("Logged in successfully");
      this._router.navigate(['/admin/manageprod']);
      }
    }
    else{
      alert("Login failed, try again");
    }
    }, error => {console.log(error)});

  }

}

}
