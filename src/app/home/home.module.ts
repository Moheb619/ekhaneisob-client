import { CommonComponentsModule } from './../common-components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, CartComponent],
  imports: [CommonModule, HomeRoutingModule, CommonComponentsModule],
})
export class HomeModule {}
