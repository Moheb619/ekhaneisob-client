import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private endPoint: string = environment.apiEndPoint;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.endPoint + 'categories/get-categories');
  }
}
