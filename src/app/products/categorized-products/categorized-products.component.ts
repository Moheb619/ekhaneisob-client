import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsModel } from 'src/app/shared/models/ProductsModel';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-categorized-products',
  templateUrl: './categorized-products.component.html',
  styleUrls: ['./categorized-products.component.css'],
})
export class CategorizedProductsComponent {
  title = 'detect-route-change';
  category: string;
  sub_category: string;
  categorized_product: ProductsModel[];
  subscription: Subscription[] = [];
  imageNumber: number;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    // Get Category and Sub Category from URL
    this.categorized_product = [];
    this.category = this.activeRoute.snapshot.params['category'];
    this.sub_category = this.activeRoute.snapshot.params['sub_category'];
    this.imageNumber = Math.floor(Math.random() * 3);
    this.subscription.push(
      this.productService
        .getCategorizedProducts(this.category, this.sub_category)
        .subscribe((data: ProductsModel[]) => {
          this.categorized_product = data;
        })
    );

    // Get Catagorized product on route change
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.category = this.activeRoute.snapshot.params['category'];
        this.sub_category = this.activeRoute.snapshot.params['sub_category'];
        this.imageNumber = Math.floor(Math.random() * 3);
        this.subscription.push(
          this.productService
            .getCategorizedProducts(this.category, this.sub_category)
            .subscribe((data: ProductsModel[]) => {
              this.categorized_product = data;
            })
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
