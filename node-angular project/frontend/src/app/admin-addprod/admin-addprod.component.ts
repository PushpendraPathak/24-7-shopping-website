import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-admin-addprod',
  templateUrl: './admin-addprod.component.html',
  styleUrls: ['./admin-addprod.component.css']
})
export class AdminAddprodComponent implements OnInit {

  request_addproduct= {
    "name":"",
    "category": "",
    "price": "",
    "discountPrice": "",
    "description": "",
    "image": ""
  }

  result={
    "status": "",
    "message": ""
}
  constructor(private _httpClient: HttpClient, private _router:Router, private _authGuard: AuthGuard) { }

  customer_name: String='';

  ngOnInit(): void {
    this.customer_name=window.localStorage.getItem('firstName');
  }

  addProduct(){
    this._httpClient.post<JSON>("http://localhost:3000/admin/products",this.request_addproduct).subscribe(result =>{
      this.result['status']=result['status'];
      this.result['message']=result['message'];
      alert(this.result['message'])
      this._router.navigate(['admin/manageprod']);
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
