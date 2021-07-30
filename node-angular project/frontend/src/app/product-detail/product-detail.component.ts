import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  customer_name: String='';
  id:any;
  product:Product=new Product();
  result={
    "status":'',
    "message":''
  }
  customer_login: String='';

  constructor(private _httpClient: HttpClient, private _route: ActivatedRoute, private _router:Router, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.id= this._route.snapshot.paramMap.get('id');
    console.log(this.id);
    this._httpClient.get<JSON>("http://localhost:3000/products/" +this.id).subscribe(result =>{
      this.result['status']=result['status'];
      this.result['message']=result['message'];
      this.product= result['message'];
    }, error =>{console.log(error);})
  }

  deleteProduct(){
    this._httpClient.delete('http://localhost:3000/products/'+this.id).subscribe(result =>{
      alert("Product deleted");
      this._router.navigate(['/products']);
    }, (error)=> {
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
