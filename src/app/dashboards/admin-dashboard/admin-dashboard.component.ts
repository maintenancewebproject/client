import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../../dialogs/update-user-dialog/update-user-dialog.component';
import { Role } from '../../models/role';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName','role', 'delete', 'update'];
  roles : string[] = ['Administrateur', 'Résponsable', 'Usager'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  


  public users: User[] = [];
  public dataSource!: MatTableDataSource<any>; 
  
  public roleSelector : FormControl = new FormControl(new Number()); 
  

  constructor(private userService: UserService, private router: Router, public dialog : MatDialog) {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        const ELEMENT_DATA: Element[] = [];
        this.users.forEach((user) => {
          let elem : Element = {
            id: user.id, firstName :user.firstName,lastName :user.lastName ,role : this.roles[user.role -1], delete:'', update:''};
            ELEMENT_DATA.push(elem);
          });
        this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        alert(error.message);
        this.dataSource = new MatTableDataSource<Element>([]);  
        this.dataSource.paginator = this.paginator;   
      } 
    );   
  }

  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        if(users) {
        this.users = users;
        const ELEMENT_DATA: Element[] = [];
        this.users.forEach((user) => {
          let elem : Element = {
            id: user.id, firstName :user.firstName,lastName :user.lastName ,role : this.roles[user.role -1], delete:'', update:''};
            ELEMENT_DATA.push(elem);
        });
        this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
      }
      });
    }
  
  public deleteUser(e: Element): void {
    this.userService.deleteUser(e.id).subscribe(
      (response) => {
        this.getUsers();
      },
      (error) => {
        alert("L'utilisateur n'a pas pu être supprimé");
      }
    );
  }

  public updateUser(e: Element): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: {
        userId: e.id}});
      dialogRef.afterClosed().subscribe(result => {
        this.getUsers();
      });
  }

  public addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

}

export interface Element {
  id: number;
  firstName :string;
  lastName : string;
  role : string;
  delete:string;
  update:  string;
}