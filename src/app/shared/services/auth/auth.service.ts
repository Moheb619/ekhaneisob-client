import { Router } from '@angular/router';
import { UserModel } from './../../models/UserModel';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endPoint: string = environment.apiEndPoint;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) {}

  // Sign-up
  signUp(user: UserModel): Observable<any> {
    let api = `${this.endPoint}auth/register`;
    return this.http.post(api, user);
  }

  // Sign-in
  signIn(user: any) {
    return this.http.post<any>(`${this.endPoint}auth/login`, user, {
      headers: this.headers,
    });
    // .subscribe((res: any) => {
    //   localStorage.setItem('access_token', res.token);
    //   this.getUserProfile(res._id).subscribe((res) => {
    //     this.currentUser = res;
    //     // this.router.navigate(['user-profile/' + res.msg._id]);
    //   });
    // });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getIsLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
  }

  // UserModel profile
  getUserProfile(id: string): Observable<any> {
    let api = `${this.endPoint}users/get-user/${id}`;
    return this.http.get(api);
  }
}
