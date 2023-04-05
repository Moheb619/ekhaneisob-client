import { AuthService } from './../shared/services/auth/auth.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
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
    private productsService: ProductsService,
    private authService: AuthService,
    private cookieService: CookieService,
    private location: Location
  ) {}
  ngOnInit(): void {
    // Get UserProfile using Access Token
    this.authService.getTokenValue().subscribe((data: any) => {
      if (data.user.id) {
        this.authService.getUserProfile(data.user.id).subscribe((user: any) => {
          this.currentUser = user;
        });
      }
    });
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
          // localStorage.setItem('id', res._id);
          this.location.go('/');
          window.location.reload();
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
