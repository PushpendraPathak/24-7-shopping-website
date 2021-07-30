import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  customer_name: String='';
  customer: Customer=new Customer();
  cart: any;
  id: any;
  addressString= {
    "streetaddress":'',
    "city":"",
    "state":"",
    "zipcode":""
  };
  customer_login: String='';

  constructor(private _authGuard: AuthGuard, private _httpClient: HttpClient, private _route:ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.customer_name=window.localStorage.getItem('firstName');
    if(window.localStorage.getItem('isLoggedIn')=="true"){
      this.id= window.localStorage.getItem('userid');
    this._httpClient.post<JSON>('http://localhost:3000/profile/'+this.id,{}).subscribe(result=>{
      this.customer=result['profile'];
      console.log(this.customer);
    }, error => {
      console.log(error);
    })
    }
  }

  checkout(){
    // let addressstr= this.addressString['streetaddress']+', '+this.addressString['city']+', '+this.addressString['state']+', '+this.addressString['zipcode'];
    // if(window.localStorage.getItem('isLoggedIn')=="true"){

    // }
    // else{

    // }
    window.localStorage.setItem('userid-cart',this.customer.username);
    window.localStorage.setItem('user-cart',this.customer.firstName);
    window.localStorage.setItem('userid-orders', this.customer.username);
    this._router.navigate(['/postloginhome/checkout']);
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
