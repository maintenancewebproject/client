import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { AddResourceDialogComponent } from '../dialogs/add-resource-dialog/add-resource-dialog.component';
import { UpdateResourceDialogComponent } from '../dialogs/update-resource-dialog/update-resource-dialog.component';
import { Anomalie } from '../models/anomalie';
import { Resource } from '../models/resource';
import { User } from '../models/user';
import { AnomalieService } from '../services/anomalie.service';
import { ResourceService } from '../services/resource.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.css']
})
export class AnomalieComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','localisation', 'description', 'delete','ticket'];

  public anomalies: Anomalie[] = [];
  public dataSource!: MatTableDataSource<any>; 
  private resourceId! : number;
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService : UserService , private anomalieService: AnomalieService, private resourceService : ResourceService, private router: Router, public dialog : MatDialog, private route: ActivatedRoute) {
    this.resourceId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0;
   this.resourceService.getResourceById(this.resourceId).subscribe( (resource) => {
     this.anomalies = resource.anomalies;
      const ELEMENT_DATA: Element[] = [];
      this.anomalies.forEach((anomalie) => {
        let elem : Element = {
          id: anomalie.id,localisation : resource.localisation, description:anomalie.description, delete:'', ticket: ''};
          ELEMENT_DATA.push(elem);
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
     this.anomalies = resource.anomalies;
      const ELEMENT_DATA: Element[] = [];
      this.anomalies.forEach((anomalie) => {
        let elem : Element = {
          id: anomalie.id,localisation : resource.localisation, description:anomalie.description, delete:'', ticket: ''};
          ELEMENT_DATA.push(elem);
      });
      this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    });
   }

  public deleteAnomalie(e: Element): void {
    this.anomalieService.deleteAnomalieById(e.id).subscribe(
      (response) => {
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
    doc.text( 'Ticket de maintenance : ' + element.id ,20, 20);
    doc.setFontSize(16)
    var today = new Date();
    today.toLocaleDateString('fr-FR');
today.toLocaleTimeString('fr-FR');
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


    doc.text(  
       ' \n Localisation : ' + element.localisation + 
       '\n Discription : ' + element.description + 
       ' \n Date :' + today,20, 30);
    doc.save( "ticket_" + element.id + " _ " + element.localisation + ".pdf");
  }
}

export interface Element {
  id: number;
  description: string;
  localisation: string;
  delete:string;
  ticket: string;
}
