import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuardGuard } from './../auth-guard.guard';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: 'shopping-cart',
    canActivate: [AuthGuardGuard],
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
