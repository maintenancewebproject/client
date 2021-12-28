import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  data = 'https://geeksforgeeks.org/';
}


