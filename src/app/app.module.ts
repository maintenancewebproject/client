import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsagerDashboardComponent } from './usager-dashboard/usager-dashboard.component';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { QrCodeComponent } from './qr-code/qr-code.component'


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LogInComponent,
    UsagerDashboardComponent,
    QrCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxQRCodeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class QRCodeAppModule { }
