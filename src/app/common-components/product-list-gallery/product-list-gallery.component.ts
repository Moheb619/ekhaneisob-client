import { ProductsModel } from './../../shared/models/ProductsModel';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-gallery',
  templateUrl: './product-list-gallery.component.html',
  styleUrls: ['./product-list-gallery.component.css'],
})
export class ProductListGalleryComponent {
  @Input() categorized_product: ProductsModel[] = [];
  imageNumber: number = Math.floor(Math.random() * 3);
}
