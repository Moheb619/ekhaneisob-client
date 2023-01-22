import { AuthService } from './../shared/services/auth/auth.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  subscription: Subscription[] = [];
  currentUser: any;
  username: string;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.currentUser = localStorage.getItem('user') ? JSON.parse(user!) : '';
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
        document.cookie = `access_token=${data.access_token}`;
        document.cookie = `id=${data.id}`;
        this.authService.getUserProfile(data.id).subscribe((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          location.reload();
        });
      })
    );
  }
  submitLogout() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = 'access_token=';
    document.cookie = 'id=';
    location.reload();
  }
}
