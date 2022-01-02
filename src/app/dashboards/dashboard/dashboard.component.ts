import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   public resourceId!: number;
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.resourceId =  this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0; 
  }

  ngOnInit(): void {
  }

   inviteAccess() {
    this.router.navigate(['/add-anomalie-dialog' , this.resourceId]);
  }

  openLogin() {
    this.router.navigate(['login/' + this.resourceId])
  }
}

