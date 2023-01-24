import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { ProductsModel } from 'src/app/shared/models/ProductsModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  product_details: any = '';
  related_product: any;
  product_id: string;
  selectedProductImage: string;
  color: string[];
  size: string[];

  selectedProductImageFunction(imageUrl: string) {
    this.selectedProductImage = imageUrl;
  }

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription.push(
      this.route.params.subscribe((params) => {
        this.product_id = params['id'];
      })
    );
    this.subscription.push(
      this.productService
        .getProductDetails(this.product_id)
        .subscribe((productDetails) => {
          this.selectedProductImage = productDetails.img[0];
          this.product_details = productDetails;
          this.color = this.product_details.product_more_details.color
            ? this.product_details.product_more_details.color.split(',')
            : '';
          this.size = this.product_details.product_more_details.size
            ? this.product_details.product_more_details.size.split(',')
            : '';
          this.productService
            .getCategorizedProducts(
              this.product_details.category,
              this.product_details.sub_category
            )
            .subscribe((rProducts) => {
              this.related_product = rProducts;
            });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
