import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginUserData = {email:"", password:""}

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login () {
    this.auth.login(this.loginUserData)
    .subscribe(
      res => {
        this.router.navigate(['/admin-dashboard'])
      },
      err => console.log(err)
    ) 
  }

  // restorePassword () {
  //   this._auth.restorePassword(this.loginUserData).subscribe(
  //     res => {
  //       localStorage.setItem('token',res.token)
  //       this._router.navigate(['/mailsent'])
  //     },
  //     err => console.error(err)
  //   )
  // }
}
