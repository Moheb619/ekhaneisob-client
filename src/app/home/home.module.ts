import { CommonComponentsModule } from './../common-components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CartComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonComponentsModule,
    ProductsModule,
  ],
})
export class HomeModule {}
