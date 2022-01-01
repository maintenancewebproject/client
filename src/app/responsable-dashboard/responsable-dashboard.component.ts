import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AddResourceDialogComponent } from '../dialogs/add-resource-dialog/add-resource-dialog.component';
import { AddUserDialogComponent } from '../dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateResourceDialogComponent } from '../dialogs/update-resource-dialog/update-resource-dialog.component';
import { UpdateUserDialogComponent } from '../dialogs/update-user-dialog/update-user-dialog.component';
import { Resource } from '../models/resource';
import { User } from '../models/user';
import { ResourceService } from '../resource.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-responsable-dashboard',
  templateUrl: './responsable-dashboard.component.html',
  styleUrls: ['./responsable-dashboard.component.css']
})
export class ResponsableDashboardComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','localisation', 'description', 'delete', 'update', 'access'];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  


  public resources: Resource[] = [];
  public dataSource!: MatTableDataSource<any>; 
  public user!: User; 
  private userId! : number;
  

  constructor(private userService : UserService , private resourceService: ResourceService, private router: Router, public dialog : MatDialog, private route: ActivatedRoute) {
    console.log(this.router.url);
    this.userId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0;
   this.userService.getUsers().subscribe( (users) => {
    const user =  users.find((user) => { return user.id === this.userId; });
     console.log(user.resource);
     this.resources = user.resource;
      const ELEMENT_DATA: Element[] = [];
      this.resources.forEach((resource) => {
        console.log(resource)
        let elem : Element = {
          id: resource.id,localisation : resource.localisation,description:resource.description, delete:'', update:'', access:''};
          ELEMENT_DATA.push(elem);
          console.log(ELEMENT_DATA);
      });
      this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator; 
    });
  }

  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  }

  public getResources(): void {
    this.userService.getUsers().subscribe( (users) => {
      const user =  users.find((user) => { return user.id === this.userId; });
       console.log(user.resource);
       this.resources = user.resource;
        const ELEMENT_DATA: Element[] = [];
        this.resources.forEach((resource) => {
          console.log(resource)
          let elem : Element = {
            id: resource.id,localisation : resource.localisation,description:resource.description, delete:'', update:'', access:''};
            ELEMENT_DATA.push(elem);
            console.log(ELEMENT_DATA);
        });
        this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
      });
  }
  
  public deleteResource(e: Element): void {
    this.resourceService.deleteResource(e.id).subscribe(
      (response) => {
        console.log(response);
        this.getResources();
      },
      (error) => {
        alert("L'utilisateur n'a pas pu être supprimé");
      }
    );
  }

  public updateResource(e: Element): void {
    const dialogRef = this.dialog.open(UpdateResourceDialogComponent, {
      data: {
        resourceId: e.id}});
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getResources();
    });
  }

  public addResource(): void {
    const dialogRef = this.dialog.open(AddResourceDialogComponent, {
      data: {
        userId: this.userId}});
        console.log(this.userId);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getResources();
    });
  }

  public openAnomaliesList(resourceId :  number): void {
    this.router.navigate(['/anomalie/' + resourceId]);
  }

  public generateAccess(element : Element) {
    // var qrcode = new qrcode("qr_code", {
    //   text: "http://localhost:4200" + '/dashboard/' + element.id,
    //   width: 128,
    //   height: 128,
    //   colorDark : "#000000",
    //   colorLight : "#ffffff",
    //   correctLevel : qrcode.CorrectLevel.H
    // });
    var doc = new jsPDF();          
    doc.setFontSize(22)
    doc.text( 'Fiche de signalation d\'anomalie:' ,20, 20);
    doc.setFontSize(16);
    doc.text('Suiviez le lien pour signaler un problème : ' + 'http://localhost:4200' + '/dashboard/' + element.id, 20, 30);
    doc.text("Ou scannez le Qrcode suivant ", 20, 40);
    //doc.html(qrcode);
    //doc.text('Date et heure :' +  Date.now(),20, 30);
    doc.save( "anomalies_" + element.localisation + ".pdf");
  }
  public generateAccess1(element : Element) {
   
    const doc: jsPDF = new jsPDF("p", "mm", "a4");
    doc.text("Scannez le code suivant :", 20, 20);
   
    doc.save( "anomalies_" + element.localisation + ".pdf");
  }

}

export interface Element {
  id: number;
  description: string;
  localisation: string;
  delete:string;
  update:  string;
  access : string;
}

