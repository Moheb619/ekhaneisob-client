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
}
