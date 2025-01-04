import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center">
      <canvas #qrCanvas></canvas>
    </div>
  `
})
export class QRCodeComponent implements OnInit {
  @Input() data!: string;

  ngOnInit() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      QRCode.toCanvas(canvas, this.data, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }
  }
}