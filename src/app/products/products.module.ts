import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [CommonModule, ProductsRoutingModule, CommonComponentsModule],
})
export class ProductsModule {}
