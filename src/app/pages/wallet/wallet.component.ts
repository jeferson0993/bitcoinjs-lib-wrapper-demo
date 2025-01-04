import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { QRCodeComponent } from '../../components/qr-code/qr-code.component';
import { TransactionListComponent } from '../../components/transaction-list/transaction-list.component';
import { SendBitcoinComponent } from '../../components/send-bitcoin/send-bitcoin.component';
import { AddressListComponent } from '../../components/address-list/address-list.component';
import { NetworkSelectorComponent } from "../../components/network-selector/network-selector.component";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    QRCodeComponent,
    TransactionListComponent,
    SendBitcoinComponent,
    AddressListComponent,
    NetworkSelectorComponent
],
  template: `
    <div class="container mx-auto">
      @if (!walletService.mnemonic()) {
        <div class="text-center py-12">
          <h2 class="text-2xl font-bold mb-4">Welcome to Bitcoin Wallet</h2>
          <div class="space-x-4">
            <a 
              routerLink="/create" 
              class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create New Wallet
            </a>
            <a 
              routerLink="/restore" 
              class="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Restore Wallet
            </a>
          </div>
        </div>
      } @else {
        <div>
          <app-network-selector />
        </div>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold mb-4">Wallet Balance</h2>
              <div class="text-3xl font-bold mb-4">
                {{ walletService.totalBalance() }} BTC
              </div>
              <div class="text-sm text-gray-600">
                Network: {{ walletService.network() }}
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <app-address-list />
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow p-6">
              <app-send-bitcoin />
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold mb-4">Receive Bitcoin</h2>
              <app-qr-code [data]="walletService.selectedAddress() || 'something went wrong!'" />
              <div class="mt-4">
                <div class="flex items-center space-x-2">
                  <input 
                    type="text" 
                    [value]="walletService.selectedAddress() || 'something went wrong!'" 
                    readonly
                    class="flex-1 p-2 border rounded bg-gray-50"
                  />
                  <button 
                    (click)="copyAddress()"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Transaction History</h2>
          <app-transaction-list [transactions]="walletService.transactions()" />
        </div>
      }
    </div>
  `
})
export class WalletComponent {
  walletService = inject(WalletService);

  copyAddress(): void {
    navigator.clipboard.writeText(this.walletService.selectedAddress() || '');
  }
}