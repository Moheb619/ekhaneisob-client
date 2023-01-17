import { Subscription } from 'rxjs';
import { ProductsService } from './../shared/services/products/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  title = 'detect-route-change';
  category: string;
  sub_category: string;
  categorized_product: any;
  subscription: Subscription[] = [];
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
    this.subscription.push(
      this.productService
        .getCategorizedProducts(this.category, this.sub_category)
        .subscribe((data: any) => {
          this.categorized_product = data;
        })
    );

    // Get Catagorized product on route change
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.category = this.activeRoute.snapshot.params['category'];
        this.sub_category = this.activeRoute.snapshot.params['sub_category'];

        this.subscription.push(
          this.productService
            .getCategorizedProducts(this.category, this.sub_category)
            .subscribe((data: any) => {
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
