import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import jsPDF from 'jspdf';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  public userForm: FormGroup;
  public password : string = "";
  public download : boolean = false;

  @ViewChild('pdfTable') pdfTable!: ElementRef;


  firstname = new FormControl('', [Validators.required]);
      lastname = new FormControl('', [Validators.required]);
      userEmail = new FormControl('', [Validators.required, Validators.email]);
      userRole = new FormControl('', [Validators.required]);

  //getters for form fields
  get firstName() { return this.userForm.get('firstName')?.value; }
  get lastName() { return this.userForm.get('lastName')?.value; }
  get email() { return this.userForm.get('email')?.value; }
  get role() { return this.userForm.get('role')?.value; }

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = new FormGroup({
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.userEmail,
      role: this.userRole   
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.password =  Math.random().toString(36).slice(-8);
    this.userService.addUser(this.lastName, this.firstName, this.password,this.email, Number(this.role) )
    .subscribe(
      (response) => {
        console.log(response);
        this.download = true;
        this.downloadPDF(this.firstName, this.lastName);
        alert("L'utilisateur a été ajouté avec succès");
        this.userForm.reset();
      },
      (error) => {
        alert("Erreur lors de l'ajout de l'utilisateur");
        this.userForm.reset();
      }
    );
  }

  public downloadPDF(firstName: string, lastName: string):void {
    var doc = new jsPDF();          
    doc.setFontSize(22)
    doc.text( 'Information de connexion :' ,20, 20);
    doc.setFontSize(16)
    doc.text('Nom: ' + firstName + ' \n Prénom: ' + lastName + ' \n Email: ' + this.email + ' \n Mot de passe: ' + this.password,20, 30);
    doc.save( firstName + "_" + lastName + ".pdf");
  }
}

