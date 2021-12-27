import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public users: User[] = [];
  public editUser!: User | null;
  public deleteUser!: User | null;
  private newPassword: String = '';
  
  public roles : Role[] = [
    {id: 1, description: 'Administrateur'},
    {id: 2, description: 'Responsable de maintenance'},
    {id: 3, description: 'Usager'},
  ];

  public roleSelector : FormControl = new FormControl(new Number()); 

  constructor(private userService: UserService){
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    this.newPassword = Math.random().toString(36).slice(-8);
    document.getElementById('add-user-form')?.click();
    let user = {
      lastName: addForm.value.lastName.toString(),
      firstName: addForm.value.firstName.toString(),
      email: addForm.value.email.toString(),
      password: this.newPassword,
      role: {
        id: this.roleSelector.value.id,
        description: this.roleSelector.value.description.toString()
      }
    };
    this.userService.addUser(addForm.value.lastName, addForm.value.firstName, this.newPassword,addForm.value.email, this.roleSelector.value.id ).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUser(user: User): void {

    this.userService.updateUser(user.firstName,user.lastName,user.password, user.email, user.role.id).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userId: number | undefined): void {
    if(userId) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.role.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

  public onOpenModal(user: User | null , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
