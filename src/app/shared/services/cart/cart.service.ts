import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private endPoint: string = environment.apiEndPoint;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) {}

  addToCart(cart: any) {
    console.log(cart);
    return this.http.post<any>(`${this.endPoint}carts/add-to-cart`, cart, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
