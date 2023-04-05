import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  subscription: Subscription[] = [];
  currentUser: any;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    // Get UserProfile using Access Token
    if (localStorage.getItem('id')) {
      this.subscription.push(
        this.authService
          .getUserProfile(localStorage.getItem('id'))
          .subscribe((data: any) => {
            this.currentUser = data;
            console.log(this.currentUser);
          })
      );
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('id')) {
      return this.authService.getUserProfile(localStorage.getItem('id')).pipe(
        map((user) => {
          return true;
        }),
        catchError(() => of(false))
      );
    } else {
      return false;
    }

    return false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
