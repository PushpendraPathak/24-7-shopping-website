import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

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

  constructor(private _authGuard: AuthGuard, private _httpClient: HttpClient, private _route:ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
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

  update(){
        let addressstr= this.addressString['streetaddress']+', '+this.addressString['city']+', '+this.addressString['state']+', '+this.addressString['zipcode'];
        this.customer.address= addressstr;
        this._httpClient.post<JSON>("http://localhost:3000/profile/address/"+window.localStorage.getItem('userid'),{"address":this.customer.address}).subscribe(result=>{
          alert(result['message']);
          this._router.navigate(['/postloginhome/profile']);
        })
  }

  updateImage(){
        this._httpClient.post<JSON>("http://localhost:3000/profile/image/"+window.localStorage.getItem('userid'),{"profileimage":this.customer.profileimage}).subscribe(result=>{
          alert(result['message']);
          this._router.navigate(['/postloginhome/profile']);
        })
  }

  deleteImage(){
        this._httpClient.delete<JSON>("http://localhost:3000/profile/image/"+window.localStorage.getItem('userid')).subscribe(result=>{
          alert(result['message']);
          this._router.navigate(['/postloginhome/profile']);
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
