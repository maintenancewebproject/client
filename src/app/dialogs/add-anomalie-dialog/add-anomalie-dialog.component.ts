import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnomalieService } from 'src/app/anomalie.service';
import { ResourceService } from 'src/app/resource.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-anomalie-dialog',
  templateUrl: './add-anomalie-dialog.component.html',
  styleUrls: ['./add-anomalie-dialog.component.css']
})
export class AddAnomalieDialogComponent implements OnInit {
  public anomalieForm: FormGroup;


  description = new FormControl('', [Validators.required]);
   public userId!: number;
   public resourceId!: number;

  //getters for form fields
  get Description() { return this.anomalieForm.get('description')?.value; }

 
  constructor(private userService : UserService, private route: ActivatedRoute, private anomalieService : AnomalieService, private resourceService: ResourceService) {
    this.resourceId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0; 
    this.anomalieForm = new FormGroup({
      description : this.description  
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.anomalieService.addAnomalie(this.Description,this.resourceId,false, 0).subscribe(
      (response) => {
        console.log(response);
        alert("L'anomalie a été ajouté avec succès");
        this.anomalieForm.reset();
      },
      (error) => {
        alert("Erreur lors de l'ajout de l'anomalie'");
        this.anomalieForm.reset();
      }
    );
  }
}

