import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(public authService: AuthService,private userService : UserService){
    userService.getUsers().subscribe((users) => {
      if(users.length == 0) {
         userService.addUser('maintenance', 'admin','administrateur','admin@gmail.com',1).subscribe(
            (response) => {
              console.log('user created');
            }
          );
      }
      }
    );

  }
}
