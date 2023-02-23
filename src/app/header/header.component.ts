import { AuthService } from './../shared/services/auth/auth.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  currentUser: any;
  username: string;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('id') && !this.cookieService.get('access_token')) {
      location.reload();
    }
    if (localStorage.getItem('id')) {
      const id = localStorage.getItem('id');
      this.authService.getUserProfile(id).subscribe((res) => {
        this.currentUser = res;
      });
    }
  }

  submitSearch(searchForm: NgForm) {
    this.router.navigate(['/products/searched-products'], {
      queryParams: { name: searchForm.value.searchFld },
    });
  }
  submitLoginForm(loginForm: NgForm) {
    const loggedInDetails = {
      email: loginForm.form.value.loginEmail,
      password: loginForm.value.loginPassword,
      toBeRemembered: loginForm.value.loginCheckBox,
    };
    this.subscription.push(
      this.authService.signIn(loggedInDetails).subscribe((data: any) => {
        this.authService.getUserProfile(data.id).subscribe((res) => {
          this.currentUser = res;
          localStorage.setItem('id', res._id);
          location.reload();
        });
      })
    );
  }
  submitLogout() {
    localStorage.clear();
    sessionStorage.clear();
    this.subscription.push(
      this.authService.doLogout().subscribe((data: any) => {
        location.reload();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
