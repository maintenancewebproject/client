import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ResourceService } from 'src/app/resource.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-resource-dialog',
  templateUrl: './add-resource-dialog.component.html',
  styleUrls: ['./add-resource-dialog.component.css']
})
export class AddResourceDialogComponent implements OnInit {

  public userForm: FormGroup;


  etage = new FormControl('', [Validators.required]);
  appart = new FormControl('');
  description = new FormControl('', [Validators.required]);
   public userId !: number;

  //getters for form fields
  get Etage() { return this.userForm.get('etage')?.value; }
  get Appart() { return this.userForm.get('appart')?.value; }
  get Description() { return this.userForm.get('description')?.value; }

  constructor(private userService : UserService, private resourceService: ResourceService, @Inject(MAT_DIALOG_DATA) public data : Item) {
    this.userId = this.data.userId;
    this.userForm = new FormGroup({
      etage : this.etage,
      appart : this.appart,
      description : this.description  
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUserById(this.userId).subscribe( (user) => {
    this.resourceService.addResource(this.Etage + ' - ' + this.Appart, this.Description, user.id).subscribe(
      (response) => {
        console.log(response);
        alert("La ressource a été ajouté avec succès");
        this.userForm.reset();
      },
      (error) => {
        alert("Erreur lors de l'ajout de la ressource");
        this.userForm.reset();
      }
    );
    });
  }
}
export interface Item {
  userId: number;
}

