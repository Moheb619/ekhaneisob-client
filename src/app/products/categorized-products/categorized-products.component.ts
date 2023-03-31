import { SortDataService } from './../../shared/services/sort-data/sort-data.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
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
    private productService: ProductsService,
    private sortService: SortDataService
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
  selectedSortingMethod(event: any) {
    if (event.target.value) {
      if (event.target.value === 'atoz') {
        this.AtoZ();
      } else if (event.target.value === 'ztoa') {
        this.ZtoA();
      } else if (event.target.value === 'hightolow') {
        this.HightoLow();
      } else if (event.target.value === 'lowtohigh') {
        this.LowtoHigh();
      }
    }
  }
  AtoZ() {
    this.categorized_product = this.sortService.sortAscendingProductsName(
      this.categorized_product
    );
    console.log(
      this.sortService.sortAscendingProductsName(this.categorized_product)
    );
  }
  ZtoA() {
    this.categorized_product = this.sortService.sortDescendingProductsName(
      this.categorized_product
    );
  }
  HightoLow() {
    this.categorized_product = this.sortService.sortDescendingProductsPrice(
      this.categorized_product
    );
  }
  LowtoHigh() {
    this.categorized_product = this.sortService.sortAscendingProductsPrice(
      this.categorized_product
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
