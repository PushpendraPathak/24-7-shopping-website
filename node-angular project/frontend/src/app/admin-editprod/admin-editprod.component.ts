import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-admin-editprod',
  templateUrl: './admin-editprod.component.html',
  styleUrls: ['./admin-editprod.component.css']
})
export class AdminEditprodComponent implements OnInit {

  customer_name: String= '';
  id:any;
  product:Product=new Product();
  request= {
    "name":"",
    "category": "",
    "price": 0,
    "discountPrice": 0,
    "description": "",
    "image": ""
  }

  result={
    "status": "",
    "message": ""
}


  constructor(private _httpClient: HttpClient, private _route: ActivatedRoute, private _router:Router, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_name= window.localStorage.getItem('firstName');
    this.id= this._route.snapshot.paramMap.get('id');
    this._httpClient.get<JSON>("http://localhost:3000/products/" +this.id).subscribe(result =>{
      this.product= result['message'];
      console.log(this.product);
    }, error =>{console.log(error);})
  }

  editProduct(){
    this.request['name']=this.product.name;
    this.request['price']=this.product.price;
    this.request['discountPrice']=this.product.discountPrice;
    this.request['category']=this.product.category;
    this.request['description']=this.product.description;
    this.request['image']=this.product.image;
    this._httpClient.post<JSON>("http://localhost:3000/admin/products/"+this.id,this.request).subscribe(result =>{
      this.result['status']=result['status'];
      this.result['message']=result['message'];
      alert(result['message']);
      this._router.navigate(['/admin/manageprod']);
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
