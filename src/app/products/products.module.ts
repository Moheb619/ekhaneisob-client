import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategorizedProductsComponent } from './categorized-products/categorized-products.component';

@NgModule({
  declarations: [ProductDetailsComponent, CategorizedProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, CommonComponentsModule],
  exports: [CategorizedProductsComponent],
})
export class ProductsModule {}
