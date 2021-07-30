import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  customer_name: String='';
  cart: any;
  productListId: number[]=[];
  products: Product[]=[];
  productscart: Product[]=[];
  sum: number;
  name: string;
  customer_login: String='';

  constructor(private _authGuard: AuthGuard, private _router: Router, private _route: ActivatedRoute, private _httpClient: HttpClient) { }


  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.customer_name= window.localStorage.getItem('firstName');
    this.productListId= JSON.parse(window.localStorage.getItem('cart'));
    this._httpClient.get<JSON>("http://localhost:3000/products").subscribe( result => {
    this.products=result['message'];
    for (let index = 0; index < this.products.length; index++) {
      this.products[index].id= result['message'][index]._id;
    }
    for (let index = 0; index < this.productListId.length; index++) {
        for (let index1 = 0; index1 < this.products.length; index1++) {
          if(this.products[index1].id==this.productListId[index]){
            this.productscart.push(this.products[index1]);
          }
        }
      };
  }, error => {console.log(error)});
  }

  confirmOrder(){
    let order={
      userid: window.localStorage.getItem('userid-cart'),
      username: window.localStorage.getItem('user-cart'),
      ordersum: this.sum,
      cart: this.productscart
    }
    this._httpClient.post<JSON>("http://localhost:3000/orders/create",order).subscribe(result =>{
      alert("Order confirmed");
      window.localStorage.removeItem('userid-cart');
      window.localStorage.removeItem('user-cart');
      window.localStorage.removeItem('cart');
    this._router.navigate(["/postloginhome/orders"]);
    }, error=>{console.log(error)})
    
  }

  total(){
    this.sum=0;
    for (let index = 0; index < this.productscart.length; index++) {
      this.sum+=this.productscart[index].discountPrice;
      
    }
    return this.sum;
  }

  onDelete(id){
    for (var i = this.productscart.length - 1; i >= 0; --i) {
      if (this.productscart[i].id == id) {
          this.productscart.splice(i,1);
          for (let index = 0; index < this.productListId.length; index++) {
              if(this.productListId[index]==id){
                console.log('gg');
                this.productListId.splice(index,1);
                window.localStorage.removeItem('cart');
                window.localStorage.setItem('cart',JSON.stringify(this.productListId));
                break; 
              }     
          }
          break;
      }
  }
  }

  clearCart(){
    window.localStorage.removeItem('cart');
    this._router.navigate(['postloginhome']);
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


