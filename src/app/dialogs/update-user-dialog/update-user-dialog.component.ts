import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {
  public userForm!: FormGroup;

 
  //getters for form fields
  get firstName() { return this.userForm.get('firstName')?.value; }
  get lastName() { return this.userForm.get('lastName')?.value; }
  get email() { return this.userForm.get('email')?.value; }
  get role() { return this.userForm.get('role')?.value; }
 
  @Input() userId!: number;


  firstname = new FormControl('', [Validators.required]);
      lastname = new FormControl('', [Validators.required]);
      userEmail = new FormControl('', [Validators.required, Validators.email]);
      userRole = new FormControl('', [Validators.required]);


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data : Item) {
    console.log(this.data.userId);
    this.userService.getUserById(this.data.userId).subscribe(
      (user) => {
        console.log(user);
        this.firstname.setValue(user.firstName);
        this.lastname.setValue(user.lastName);
        this.userEmail.setValue(user.email);
        this.userRole.setValue(user.role);

        this.userForm = new FormGroup({
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.userEmail,
          role: this.userRole   
        });
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.updateUser(this.lastName, this.firstName, this.data.userId, this.email, Number(this.role)).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}

export interface Item {
  userId: number;
}
