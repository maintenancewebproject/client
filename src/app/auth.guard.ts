import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
