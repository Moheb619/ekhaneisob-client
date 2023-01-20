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
    private productService: ProductsService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    // Get Category and Sub Category from URL
    console.log('Kisu');
    this.categorized_product = [];
    this.activeRoute.queryParams.subscribe((params) => {
      this.name = params['name'];
      console.log(this.name);
    });

    this.imageNumber = Math.floor(Math.random() * 3);
    this.subscription.push(
      this.productService
        .getSearchedProducts(this.name)
        .subscribe((data: any) => {
          this.categorized_product = data;
          console.log(data);
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
  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
