import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  customer_login: String='';
  customer_name: String='';
  products: Array<Product> =[];
  updatedProducts: Product[]=[];


  constructor(private _httpClient: HttpClient, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.customer_name= window.localStorage.getItem('firstName');

    this._httpClient.get<JSON>("http://localhost:3000/products").subscribe( result => {

      if(result['status']=='success'){
      this.products = result['message'];  
      for (let index = 0; index < this.products.length; index++) {
        this.products[index].id= result['message'][index]._id;
      }

      this.updatedProducts=[];
      for (let index = 0; index < this.products.length; index++) {
        if(this.products[index].isTopProduct==true){
          this.updatedProducts.push(this.products[index])
        }
      };
      }
      else{
        alert("Cannot fetch data, sorry");
      }
      }, error => {console.log(error)});
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
