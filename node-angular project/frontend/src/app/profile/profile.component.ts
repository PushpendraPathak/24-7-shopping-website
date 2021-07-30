import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: Customer=new Customer();
  customer_name: String='';
  id: any;

  constructor(private _httpClient: HttpClient, private _authGuard:AuthGuard) { }

  ngOnInit(): void {
    this.customer_name= window.localStorage.getItem('firstName');
    this.id= window.localStorage.getItem('userid');
    this._httpClient.post<JSON>('http://localhost:3000/profile/'+this.id,{}).subscribe(result=>{
      this.customer=result['profile'];
      console.log(this.customer);
    }, error => {
      console.log(error);
    })
  }

  logout(){
    this._authGuard.logout();
    window.location.reload();
    window.localStorage.removeItem("type");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('userid-orders');
    window.localStorage.removeItem('user-cart');
    window.localStorage.removeItem('userid-cart');
  }
}
