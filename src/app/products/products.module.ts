import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategorizedProductsComponent } from './categorized-products/categorized-products.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    CategorizedProductsComponent,
    SearchedProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CommonComponentsModule,
    FormsModule,
  ],
  exports: [CategorizedProductsComponent],
})
export class ProductsModule {}
