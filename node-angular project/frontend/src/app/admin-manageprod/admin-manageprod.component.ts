import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-admin-manageprod',
  templateUrl: './admin-manageprod.component.html',
  styleUrls: ['./admin-manageprod.component.css']
})
export class AdminManageprodComponent implements OnInit {

  customer_name: String='';

  del_result={"status":'', "message":''}
  result= {"products":[]};
  productList: Product[]=[];
  productListId: number[]=[];
  products: Array<Product> =[];
  searchstring: string='';
  updatedProducts: Product[]=[];

  constructor(private _router:Router, private _httpClient: HttpClient, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_name= window.localStorage.getItem('firstName');
    this._httpClient.get<JSON>("http://localhost:3000/products").subscribe( result => {

      if(result['status']=='success'){
      this.products = result['message'];
  
      this.updatedProducts=this.products;
      console.log(this.products);
      }
      else{
        alert("Cannot fetch data, sorry");
      }
      }, error => {console.log(error)});
    }
  
    onKeyUpEvent(event: any){
      this.updatedProducts=[];
      this.searchstring=event.target.value;
      if(this.searchstring===" "){
        this.updatedProducts=this.products;
      }
      else{
        this.updatedProducts=[];
        this.searchstring=this.searchstring.toLowerCase();
        this.products.forEach(element => {
          if(element.category.toLowerCase().includes(this.searchstring)){
            this.updatedProducts.push(element);
          }
        });
      }
   }
  
   deleteProduct(id){
    this._httpClient.delete<JSON>("http://localhost:3000/admin/products/"+id).subscribe(result=>{
      this.del_result['status']=result['status'];
      this.del_result['message']=result['message'];
      alert(this.del_result['message']);
      window.location.reload();
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
