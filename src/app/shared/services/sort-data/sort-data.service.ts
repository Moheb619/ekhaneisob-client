import { ProductsModel } from './../../models/ProductsModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortDataService {
  constructor() {}

  sortAscendingProductsName(data: ProductsModel[]): ProductsModel[] {
    data.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return data;
  }
  sortDescendingProductsName(data: ProductsModel[]): ProductsModel[] {
    data.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return data;
  }
  sortAscendingProductsPrice(data: ProductsModel[]): ProductsModel[] {
    data.sort((a, b) => a.price - b.price);
    return data;
  }
  sortDescendingProductsPrice(data: ProductsModel[]): ProductsModel[] {
    data.sort((a, b) => b.price - a.price);
    return data;
  }
}
