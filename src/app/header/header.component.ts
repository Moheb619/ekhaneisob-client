import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {}

  submitForm(searchForm: NgForm) {
    this.router.navigate(['/products/searched-products'], {
      queryParams: { name: searchForm.value.searchFld },
    });
  }
}
