import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  customer_name: String='';

  constructor(private _authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.customer_name=window.localStorage.getItem('firstName');
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
