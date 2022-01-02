import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServer = 'http://localhost:8080';
  private loggedIn : boolean = false;
  private logInData; 

  constructor(private httpClient : HttpClient, private router : Router) { }

  login(user: any) {
    const logInData = null; 
    let params = new HttpParams().set('email', user.email).set('password', user.password);
    this.httpClient.get<any>(this.apiServer + '/user/login', {params: params})
    .subscribe(
      (user) => {
        if(user) {
          //localStorage.setItem('token', user.token);
          this.loggedIn = true;
          this.logInData = user;
        }
        });

  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getLogInData() {
    return this.logInData;
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
