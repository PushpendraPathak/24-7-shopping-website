import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-postloginhome',
  templateUrl: './postloginhome.component.html',
  styleUrls: ['./postloginhome.component.css']
})
export class PostloginhomeComponent implements OnInit {

  productList: Product[]=[];
  productListId: number[]=[];
  message: string="";
  sum:number=0;
  searchstring: string='';
  updatedProducts: Product[]=[];

  customer: Customer= new Customer(); //for getting name of user to print on dropdown
  customer_name: String='';
  customer_login: String='';
  products: Array<Product> =[];
  result= {"products":[]};

  queryParams: any = {};    

  showProducts: boolean=false;

  constructor(private _router:Router, private _httpClient: HttpClient, private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.productListId= JSON.parse(window.localStorage.getItem('cart'));
    if(this.productListId==null){
      this.productListId=[];
    }
    console.log(this.productListId);
    this.customer_name=window.localStorage.getItem('firstName');
    this._httpClient.get<JSON>("http://localhost:3000/products").subscribe( result => {

      if(result['status']=='success'){
      this.products = result['message'];  
      for (let index = 0; index < this.products.length; index++) {
        this.products[index].id= result['message'][index]._id;
      }

      this.productList=[];
      for (let index = 0; index < this.productListId.length; index++) {
        for (let index1 = 0; index1 < this.products.length; index1++) {
          if(this.products[index1].id==this.productListId[index]){
            this.productList.push(this.products[index1]);
            break;
          }
        }
      };

      this.updatedProducts=result['message'];
      }
      else{
        alert("Cannot fetch data, sorry");
      }
  
      }, error => {console.log(error)});
  }

  onKeyUpEvent(event: any){
    this.updatedProducts=[];
  //   if (event.key == 'Backspace') {

  // } 
    this.searchstring=event.target.value;
    if(this.searchstring===" "){
      this.updatedProducts=this.products;
    }
    else{
      this.updatedProducts=[];
      this.searchstring=this.searchstring.toLowerCase();
      this.products.forEach(element => {
        if(element.name.toLowerCase().includes(this.searchstring)){
          this.updatedProducts.push(element);
        }
      });
    }
 }

 category(id){
   if(id==0){
    this.updatedProducts=this.products;
   }
   else if(id==1){
    this.updatedProducts=[];
    this.products.forEach(element => {
      if(element.category=='Electronics'){
        this.updatedProducts.push(element);
      }
    });
  } 
  else if(id==2){
    this.updatedProducts=[];
    this.products.forEach(element => {
      if(element.category=='Furniture'){
        this.updatedProducts.push(element);
      }
    });
  } 
  else if(id==3){
    this.updatedProducts=[];
    this.products.forEach(element => {
      if(element.category=='Clothing'){
        this.updatedProducts.push(element);
      }
    });
  } 
 }

 price(id){
  if(id==0){
    this.updatedProducts=this.products;
  }
 else if(id==1){
   this.updatedProducts=[];
   this.products.forEach(element => {
     if(element.price>0 && element.price<51){
       this.updatedProducts.push(element);
     }
   });
 } 
 else if(id==2){
   this.updatedProducts=[];
   this.products.forEach(element => {
     if(element.price>50 && element.price<151){
       this.updatedProducts.push(element);
     }
   });
 } 
 else if(id==3){
   this.updatedProducts=[];
   this.products.forEach(element => {
     if(element.price>151 && element.price<501){
       this.updatedProducts.push(element);
     }
   });
 } 
 else if(id==4){
   this.updatedProducts=[];
   this.products.forEach(element => {
     if(element.price>500 && element.price<1501){
       this.updatedProducts.push(element);
     }
   });
 } 
 else if(id==5){
   this.updatedProducts=[];
   this.products.forEach(element => {
     if(element.price>1500){
       this.updatedProducts.push(element);
     }
   });
 }  
}
  gotoCheckout(){
    this.productListId=[];
    this.productList.forEach(element => {
      console.log(element.id);
      this.productListId.push(element.id);
    });
    console.log(this.productList);
    console.log(this.productListId);
    this.queryParams.myArray = JSON.stringify(this.productListId);
    const navigationExtras: NavigationExtras = {
      queryParams:this.queryParams
    };
    window.localStorage.setItem('cart',this.queryParams.myArray);
    console.log(this.queryParams.myArray);
    this._router.navigate(['/postloginhome/cart'], navigationExtras);
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

  addToCart(product){
    this.productList.push(product);
  }

}
