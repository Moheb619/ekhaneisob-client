import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { ProductsModel } from 'src/app/shared/models/ProductsModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart/cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  currentUser: any;
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
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.subscription.push(
      this.route.params.subscribe((params) => {
        this.product_id = params['id'];
      })
    );
    // Get UserProfile using Access Token
    if (localStorage.getItem('id')) {
      this.subscription.push(
        this.authService
          .getUserProfile(localStorage.getItem('id'))
          .subscribe((data: any) => {
            this.currentUser = data;
          })
      );
    }
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
  submitCartForm(cartForm: NgForm, productId: String) {
    if (this.currentUser && productId && cartForm.value.cartQuantity) {
      const cartDetails = {
        user_id: this.currentUser._id,
        product_id: productId,
        quantity: cartForm.value.cartQuantity,
        color: cartForm.value.cartColor,
        size: cartForm.value.cartSize,
      };

      this.subscription.push(
        this.cartService.addToCart(cartDetails).subscribe((data: any) => {
          console.log('Cart Added Successfully');
        })
      );
    } else {
      console.log('Error');
    }
    // this.subscription.push(
    //   this.authService.signIn(loggedInDetails).subscribe((data: any) => {
    //     this.authService.getUserProfile(data.id).subscribe((res) => {
    //       this.currentUser = res;
    //       localStorage.setItem('id', res._id);
    //       this.location.go('/');
    //       window.location.reload();
    //     });
    //   })
    // );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
