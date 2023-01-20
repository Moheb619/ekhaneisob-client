import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CategorizedProductsComponent } from './categorized-products/categorized-products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'searched-products', component: SearchedProductsComponent },
  {
    path: 'category-based-products/:category/:sub_category',
    component: CategorizedProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
