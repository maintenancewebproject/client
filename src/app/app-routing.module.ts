import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AnomalieComponent } from './anomalie/anomalie.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddAnomalieDialogComponent } from './dialogs/add-anomalie-dialog/add-anomalie-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { LogInComponent } from './log-in/log-in.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { UsagerDashboardComponent } from './usager-dashboard/usager-dashboard.component';



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
    path: 'add-user-dialog',
    component: AddUserDialogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-user-dialog',
    component: UpdateUserDialogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'responsable-dashboard/:id',
    component: ResponsableDashboardComponent,
    //canActivate: [AuthGuard]
   // canActivate: [AuthGuard]
  },
  {
    path: 'anomalie/:id',
    component: AnomalieComponent,
    canActivate: [AuthGuard]
   // canActivate: [AuthGuard]
  },
  {
    path: 'usager-dashboard/:id',
    component: UsagerDashboardComponent,
    canActivate: [AuthGuard]
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
