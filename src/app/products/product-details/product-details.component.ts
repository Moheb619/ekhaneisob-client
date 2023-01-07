import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  selectedProductImage: string =
    './../../../assets/themes/images/products/large/f1.jpg';

  selectedProductImageFunction(imageUrl: string) {
    this.selectedProductImage = imageUrl;
  }
}
