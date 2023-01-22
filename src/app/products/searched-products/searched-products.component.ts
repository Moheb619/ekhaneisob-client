import { SortDataService } from './../../shared/services/sort-data/sort-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsModel } from 'src/app/shared/models/ProductsModel';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.css'],
})
export class SearchedProductsComponent implements OnInit {
  subscription: Subscription[] = [];
  categorized_product: any;
  name: any;
  imageNumber: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductsService,
    private sortService: SortDataService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    // Get Category and Sub Category from URL
    this.categorized_product = [];
    this.activeRoute.queryParams.subscribe((params) => {
      this.name = params['name'];
    });

    this.imageNumber = Math.floor(Math.random() * 3);
    this.subscription.push(
      this.productService
        .getSearchedProducts(this.name)
        .subscribe((data: any) => {
          this.categorized_product = data;
        })
    );

    // Get Catagorized product on route change
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.activeRoute.queryParams.subscribe((params) => {
    //       this.name = params['name'];
    //     });
    //     console.log(this.name);
    //     this.imageNumber = Math.floor(Math.random() * 3);
    //     this.subscription.push(
    //       this.productService
    //         .getSearchedProducts(this.name)
    //         .subscribe((data: ProductsModel[]) => {
    //           this.categorized_product = data;
    //         })
    //     );
    //   }
    // });
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
