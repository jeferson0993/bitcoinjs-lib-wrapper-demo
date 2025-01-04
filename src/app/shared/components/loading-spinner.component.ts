import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inline-block animate-spin rounded-full h-5 w-5 border-2 border-gray-200 border-t-blue-600"></div>
  `
})
export class LoadingSpinnerComponent {}