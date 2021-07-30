import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddprodComponent } from './admin-addprod/admin-addprod.component';
import { AdminEditprodComponent } from './admin-editprod/admin-editprod.component';
import { AdminManageprodComponent } from './admin-manageprod/admin-manageprod.component';
import { AdminComponent } from './admin/admin.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PostloginhomeComponent } from './postloginhome/postloginhome.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.services';
import { ViewordersComponent } from './vieworders/vieworders.component';

const routes: Routes = [
  { path: '', redirectTo: 'carousel', pathMatch:'full' },
  { path:'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  { path: 'postloginhome', component:PostloginhomeComponent},
  { path: 'postloginhome/product-detail/:id', component: ProductDetailComponent},
  { path: 'admin/addprod', component:AdminAddprodComponent, canActivate:[AuthGuard]},
  { path: 'admin/manageprod', component: AdminManageprodComponent, canActivate:[AuthGuard]},
  { path: 'admin/manageprod/edit/:id', component: AdminEditprodComponent, canActivate:[AuthGuard]},
  { path: 'postloginhome/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'postloginhome/cart', component: CartComponent},
  { path: 'postloginhome/checkout', component: CheckoutComponent},
  { path: 'postloginhome/orders', component: OrdersComponent},
  { path: 'admin/vieworders', component: ViewordersComponent, canActivate:[AuthGuard]},
  { path: 'profile/edit', component: ProfileEditComponent, canActivate:[AuthGuard]},
  { path: 'carousel', component: CarouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
