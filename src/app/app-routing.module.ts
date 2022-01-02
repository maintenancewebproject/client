import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { AnomalieComponent } from './anomalie/anomalie.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { AddAnomalieDialogComponent } from './dialogs/add-anomalie-dialog/add-anomalie-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { LogInComponent } from './log-in/log-in.component';
import { ResponsableDashboardComponent } from './dashboards/responsable-dashboard/responsable-dashboard.component';
import { UsagerDashboardComponent } from './dashboards/usager-dashboard/usager-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { ResponsableGuard } from './guards/responsable.guard';
import { UsagerGuard } from './guards/usager.guard';



const routes: Routes = [
  
  
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'login/:id',
    component: LogInComponent
  },
  {
    path: 'add-user-dialog',
    component: AddUserDialogComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'update-user-dialog',
    component: UpdateUserDialogComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'responsable-dashboard/:id',
    component: ResponsableDashboardComponent,
      canActivate: [ResponsableGuard]
  },
  {
    path: 'anomalie/:id',
    component: AnomalieComponent,
    canActivate: [ResponsableGuard]
  },
  {
    path: 'usager-dashboard/:id',
    component: UsagerDashboardComponent,
    canActivate: [UsagerGuard]
  },
  {
    path: 'dashboard/:id',
    component:DashboardComponent,
  },
  {
    path: 'add-anomalie-dialog/:id',
    component: AddAnomalieDialogComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
