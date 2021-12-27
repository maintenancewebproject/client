import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServer = 'http://localhost:8080';

  constructor(private httpClient : HttpClient, private router : Router) { }

  login(user: any) {
    return this.httpClient.post<any>(this.apiServer + '/user/login', user)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loggedIn() {
      return !!localStorage.getItem('token');
  }
}
