import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { LogInComponent } from './log-in/log-in.component';
import { UsagerDashboardComponent } from './usager-dashboard/usager-dashboard.component';



const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/admin-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'add-user-dialog',
    component: AddUserDialogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'update-user-dialog',
    component: UpdateUserDialogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuard]
    canActivate: [AuthGuard]
  },
  {
    path: 'usager-dashboard',
    component: UsagerDashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
