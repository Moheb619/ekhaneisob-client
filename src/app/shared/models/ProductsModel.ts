export class ProductsModel {
  name: string;
  img: string[];
  short_desc: string;
  full_desc: string;
  product_more_details: object;
  quantity: number;
  category: string;
  sub_category: string;
  price: number;
  featured: boolean = false;
  discount: number = 0;
}
