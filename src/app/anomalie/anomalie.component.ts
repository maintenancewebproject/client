import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { AnomalieService } from '../anomalie.service';
import { AddResourceDialogComponent } from '../dialogs/add-resource-dialog/add-resource-dialog.component';
import { UpdateResourceDialogComponent } from '../dialogs/update-resource-dialog/update-resource-dialog.component';
import { Anomalie } from '../models/anomalie';
import { Resource } from '../models/resource';
import { User } from '../models/user';
import { ResourceService } from '../resource.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.css']
})
export class AnomalieComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','localisation', 'description', 'delete', 'treated', 'ticket'];

  public anomalies: Anomalie[] = [];
  public dataSource!: MatTableDataSource<any>; 
  public user!: User; 
  private resourceId! : number;
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService : UserService , private anomalieService: AnomalieService, private resourceService : ResourceService, private router: Router, public dialog : MatDialog, private route: ActivatedRoute) {
   this.resourceId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0;
   this.resourceService.getResourceById(this.resourceId).subscribe( (resource) => {
      this.user = resource.user;
     this.anomalies = resource.anomalie;
      const ELEMENT_DATA: Element[] = [];
      this.anomalies.forEach((anomalie) => {
        console.log(anomalie)
        let elem : Element = {
          id: anomalie.id,localisation : resource.localisation, description:anomalie.description, delete:'', treated: anomalie.isTreated? 'Oui' : 'Non', ticket: ''};
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

  public getAnomalies(): void {
    this.resourceService.getResourceById(this.resourceId).subscribe( (resource) => {
      this.user = resource.user;
     this.anomalies = resource.anomalie;
      const ELEMENT_DATA: Element[] = [];
      this.anomalies.forEach((anomalie) => {
        console.log(anomalie)
        let elem : Element = {
          id: anomalie.id,localisation : resource.localisation, description:anomalie.description, delete:'', treated: anomalie.isTreated? 'Oui' : 'Non', ticket: ''};
          ELEMENT_DATA.push(elem);
          console.log(ELEMENT_DATA);
      });
      this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    });
   }
  
  public deleteAnomalie(e: Element): void {
    this.anomalieService.deleteAnomalieById(e.id).subscribe(
      (response) => {
        console.log(response);
        alert("L'anomalie a été supprimé");
        this.getAnomalies();
      },
      (error) => {
        alert("L'anomalie n'a pas pu être supprimé");
      }
    );
  }

  generateTicket(element : Element) {
    var doc = new jsPDF();          
    doc.setFontSize(22)
    doc.text( 'Ticket de maintenance  :' + element.id ,20, 20);
    doc.setFontSize(16)
    doc.text('Nom de l\'agent de maintenance :' + this.user.firstName + this.user.lastName +
      ' \n Email de l\'agent de maintenance : ' + this.user.email + 
       ' \n Localisation :' + element.localisation + 
       '\n Discription ' + element.description +
       '\n Traitée : ' + element.treated + 
       'Date et heure :' +  Date.now(),20, 30);
    doc.save( "ticket_" + element.id + " _ " + element.localisation + ".pdf");
  }
}

export interface Element {
  id: number;
  description: string;
  localisation: string;
  delete:string;
  treated:  string;
  ticket: string;
}
