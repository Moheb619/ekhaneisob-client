import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsModel } from '../shared/models/ProductsModel';
import { ProductsService } from '../shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featured_product: ProductsModel[];
  categorized_product: ProductsModel[];
  subscription: Subscription[] = [];
  rowLength: number[];
  colLength: number[] = Array.from(Array(4).keys());
  imageNumber: number = Math.floor(Math.random() * 3);
  four_product: ProductsModel[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    // Get Category and Sub Category from URL
    this.categorized_product = [];
    this.featured_product = [];
    this.imageNumber = Math.floor(Math.random() * 3);
    this.subscription.push(
      this.productService
        .getFeaturedProducts()
        .subscribe((data: ProductsModel[]) => {
          this.featured_product = data;
          this.rowLength = new Array(
            Math.ceil(this.featured_product.length / 4)
          );
        })
    );
    this.subscription.push(
      this.productService
        .getLatestProducts()
        .subscribe((data: ProductsModel[]) => {
          this.categorized_product = data;
        })
    );
  }
  fourProduct(i: any) {
    this.four_product = this.featured_product.slice(i, i + 4);
    return this.four_product;
  }
}
