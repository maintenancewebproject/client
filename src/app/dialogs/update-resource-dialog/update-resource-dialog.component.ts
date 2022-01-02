import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-resource-dialog',
  templateUrl: './update-resource-dialog.component.html',
  styleUrls: ['./update-resource-dialog.component.css']
})
export class UpdateResourceDialogComponent implements OnInit {
  public resourceForm!: FormGroup;

  etage = new FormControl('', [Validators.required]);
  appart = new FormControl('');
  description = new FormControl('', [Validators.required]);
   public resourceId!: number;

  //getters for form fields
  get Etage() { return this.resourceForm.get('etage')?.value; }
  get Appart() { return this.resourceForm.get('appart')?.value; }
  get Description() { return this.resourceForm.get('description')?.value; }

  constructor(private userService : UserService, private resourceService: ResourceService, @Inject(MAT_DIALOG_DATA) public data : Item) {
    this.resourceService.getResourceById(this.data.resourceId).subscribe( (resource) => {
      let localisation = resource.localisation.split(' - ');
      this.etage = new FormControl(localisation[0], [Validators.required]);
      this.appart = new FormControl(localisation[1]);
       this.description = new FormControl(resource.description, [Validators.required]);
      this.resourceId = this.data.resourceId;
      this.resourceForm = new FormGroup({
      etage : this.etage,
      appart : this.appart,
      description : this.description  
    });
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.resourceService.updateResource(this.Etage + ' - ' + this.Appart, this.Description, this.data.resourceId)
    .subscribe(
      (response) => {
        alert("La ressource a été ajouté avec succès");
        this.resourceForm.reset();
      },
      (error) => {
        alert("Erreur lors de l'ajout de la ressource");
        this.resourceForm.reset();
      }
    );
  }
}

export interface Item {
  resourceId: number;
}

