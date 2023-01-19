import { ProductsModel } from './../../shared/models/ProductsModel';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-block-gallery',
  templateUrl: './product-block-gallery.component.html',
  styleUrls: ['./product-block-gallery.component.css'],
})
export class ProductBlockGalleryComponent {
  @Input() categorized_product: ProductsModel[] = [];
  imageNumber: number = Math.floor(Math.random() * 3);
}
