import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <a routerLink="/" class="text-2xl font-bold text-gray-900">
            Bitcoin Wallet
          </a>
          @if (wallet.mnemonic()) {
            <div class="text-sm text-white">
              <button class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              type="button" (click)="signout()"> Signout </button>
            </div>
          }
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  wallet = inject(WalletService);
  router = inject(Router);

  signout(): void {
    this.wallet.signOut();
    this.router.navigateByUrl('/');
  }
}