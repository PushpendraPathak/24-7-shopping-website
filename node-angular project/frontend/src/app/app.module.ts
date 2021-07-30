import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MustMatchDirective } from './directives/must-match.directive';
import { AdminComponent } from './admin/admin.component';
import { PostloginhomeComponent } from './postloginhome/postloginhome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from './services/auth-guard.services';
import { AdminAddprodComponent } from './admin-addprod/admin-addprod.component';
import { AdminManageprodComponent } from './admin-manageprod/admin-manageprod.component';
import { AdminEditprodComponent } from './admin-editprod/admin-editprod.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewordersComponent } from './vieworders/vieworders.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    AdminComponent,
    PostloginhomeComponent,
    ProductDetailComponent,
    AdminAddprodComponent,
    AdminManageprodComponent,
    AdminEditprodComponent,
    CartComponent,
    CheckoutComponent,
    ProfileComponent,
    OrdersComponent,
    ViewordersComponent,
    ProfileEditComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
