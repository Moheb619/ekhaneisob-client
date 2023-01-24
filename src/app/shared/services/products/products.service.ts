import { ProductsModel } from './../../models/ProductsModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private endPoint: string = environment.apiEndPoint;
  constructor(private http: HttpClient) {}

  getCategorizedProducts(
    category: string,
    sub_category: string
  ): Observable<any> {
    return this.http.get(
      this.endPoint +
        'products/get-categorized-products/?' +
        `category=${category}&sub_category=${sub_category}`
    );
  }

  getLatestProducts(): Observable<any> {
    return this.http.get(this.endPoint + 'products/get-latest-products');
  }
  getFeaturedProducts(): Observable<any> {
    return this.http.get(this.endPoint + 'products/get-featured-products');
  }
  getSearchedProducts(searchName: string): Observable<any> {
    return this.http.get(
      this.endPoint + 'products/get-searched-products/?name=' + searchName
    );
  }
  getProductDetails(productId: string): Observable<any> {
    return this.http.get(this.endPoint + 'products/get-product/' + productId);
  }
}
