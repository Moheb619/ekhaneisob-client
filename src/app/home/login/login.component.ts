import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  subscription: Subscription[] = [];
  currentUser: any;
  constructor(private authService: AuthService, private location: Location) {}

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
          this.location.go('/');
          window.location.reload();
        });
      })
    );
  }
  submitRegisterForm(registerForm: NgForm) {
    const registeredDetails = {
      email: registerForm.value.registerEmail,
      password: registerForm.value.registerPassword,
      phone: registerForm.value.registerPhone,
      fullname: registerForm.value.registerFullName,
    };
    this.subscription.push(
      this.authService.register(registeredDetails).subscribe((data: any) => {
        this.authService.getUserProfile(data.id).subscribe((res) => {
          this.currentUser = res;
          localStorage.setItem('id', res._id);
          this.location.go('/');
          window.location.reload();
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
