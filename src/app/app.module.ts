import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { UpdateResourceDialogComponent } from './dialogs/update-resource-dialog/update-resource-dialog.component';
import { AddResourceDialogComponent } from './dialogs/add-resource-dialog/add-resource-dialog.component';
import { AddAnomalieDialogComponent } from './dialogs/add-anomalie-dialog/add-anomalie-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UsagerDashboardComponent } from './usager-dashboard/usager-dashboard.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { AnomalieComponent } from './anomalie/anomalie.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LogInComponent,
    AddUserDialogComponent,
    UpdateUserDialogComponent,
    UpdateResourceDialogComponent,
    AddResourceDialogComponent,
    AddAnomalieDialogComponent,
    UsagerDashboardComponent,
    ResponsableDashboardComponent,
    AnomalieComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    NgxQRCodeModule,
    QRCodeModule, 
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class QRCodeAppModule { }
