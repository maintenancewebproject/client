import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginUserData = {email:"", password:""}

  constructor(private auth: AuthService,
              private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
  }

  login () {
   this.auth.login(this.loginUserData);
   if(this.auth.getLogInData()){
     if(this.auth.getLogInData().role == 1){
        this.router.navigate(['/admin-dashboard']);
     }else {
       if(this.auth.getLogInData().role == 3){
        this.router.navigate(['/usager-dashboard/' + this.route.snapshot.queryParams['id']]);
       }else{
         if(this.auth.getLogInData().role == 2){
        this.router.navigate(['/responsable-dashboard/' + this.auth.getLogInData().id]);
         } 
      }

     }

   }
  }

}
