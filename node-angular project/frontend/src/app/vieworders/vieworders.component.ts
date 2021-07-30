import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Orders } from '../models/orders';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.css']
})
export class ViewordersComponent implements OnInit {

  orders: Orders[]=[];
  cart=[];
  finalCart=[];
  customer_name: String='';
  customer_login: String='';

  constructor(private _httpClient: HttpClient, private _authGuard:AuthGuard) { }

  ngOnInit(): void {
    this.customer_login= window.localStorage.getItem('isLoggedIn');
    this.customer_name= window.localStorage.getItem('firstName');
    this._httpClient.get<JSON>("http://localhost:3000/orders").subscribe(result=>{
      if(result['status']=='success'){
        this.orders = result['message'];
        console.log(this.orders);
        for (let index = 0; index < this.orders.length; index++) {
          console.log(this.orders);
          this.cart=[];
          for (let index1 = 0; index1 < this.orders[index].cart.length; index1++) {
            this.cart.push(this.orders[index].cart[index1]['name']);        
          }
          this.finalCart.push(this.cart);
        }
        }      
        else{
          alert("Cannot fetch data, sorry");
        }
        }, error => {console.log(error)});    
      }

      onEdit(id,check){
        if(check==false){
        this._httpClient.post<JSON>("http://localhost:3000/orders/"+id,{"isDelivered":true}).subscribe(result=>{
          alert(result['message']);
          window.location.reload();
        })
      }
      else{
        alert('Order already delivered');
      }
      }

      onDelete(id){
        this._httpClient.delete<JSON>("http://localhost:3000/orders/"+id).subscribe(result=>{
          alert(result['message']);
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
