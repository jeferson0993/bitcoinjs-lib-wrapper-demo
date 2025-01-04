import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from 'bitcoinjs-lib-wrapper';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium">Wallet Addresses</h3>
        <button
          (click)="generateNewAddress()"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Generate New Address
        </button>
      </div>

      <div class="space-y-2">
        @if (walletService.mnemonic()){
          @for (wallet of walletService.wallets(); track wallet) {
          <div
            class="p-4 border rounded-md"
            [class.bg-blue-50]="false"
          >
            <div class="flex justify-between items-center">
              <div class="space-y-1">
                <div class="font-medium">Address</div>
                <div class="text-sm text-gray-600">{{ wallet.p2wpkh!.substring(0, 17) }}...{{wallet.p2wpkh!.substring(23)}}</div>
              </div>
              <button
                (click)="selectAddress(wallet)"
                class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Select
              </button>
            </div>
          </div>
          }
        }
      </div>
    </div>
  `
})
export class AddressListComponent {
  walletService = inject(WalletService);

  async generateNewAddress(): Promise<void> {
    this.walletService.generateNewAddress();
  }
  
  selectAddress(wallet: Wallet): void {
    this.walletService.setSelectedAddress(wallet.p2wpkh!);
  }
}