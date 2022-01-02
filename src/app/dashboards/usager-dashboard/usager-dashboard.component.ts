import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnomalieService } from 'src/app/services/anomalie.service';
import { ResourceService } from 'src/app/services/resource.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usager-dashboard',
  templateUrl: './usager-dashboard.component.html',
  styleUrls: ['./usager-dashboard.component.css']
})
export class UsagerDashboardComponent implements OnInit {
  public anomalieForm: FormGroup;


  description = new FormControl('', [Validators.required]);
   public userId!: number;
   public resourceId!: number;

  //getters for form fields
  get Description() { return this.anomalieForm.get('description')?.value; }

 
  constructor(private userService : UserService, private route: ActivatedRoute, private anomalieService : AnomalieService, private resourceService: ResourceService, @Inject(MAT_DIALOG_DATA) public data : Item) {
    this.resourceId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0; 
    this.userId = this.data.userId;
    this.anomalieForm = new FormGroup({
      description : this.description  
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUserById(this.userId).subscribe( (user) => {
    this.anomalieService.addAnomalie(this.Description,this.resourceId,false, user.id).subscribe(
      (response) => {
        alert("L'anomalie a été ajouté avec succès");
        this.anomalieForm.reset();
      },
      (error) => {
        alert("Erreur lors de l'ajout de l'anomalie'");
        this.anomalieForm.reset();
      }
    );
    });
  }
}
export interface Item {
  userId: number;
}
