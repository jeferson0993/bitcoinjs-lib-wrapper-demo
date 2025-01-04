import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { NETWORK_LABELS } from '../../config/network.config';
import { Network } from '../../types/wallet.types';

@Component({
  selector: 'app-network-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium text-gray-700">Network:</label>
      <select
        [value]="wallet.network()"
        (change)="onNetworkChange($event)"
        class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        @for (network of networks; track network) {
          <option [value]="network">
            {{ networkLabels[network] }}
          </option>
        }
      </select>
    </div>
  `
})
export class NetworkSelectorComponent {
  wallet = inject(WalletService);
  networks: Network[] = ['testnet','bitcoin'];
  networkLabels = NETWORK_LABELS;

  async onNetworkChange(event: Event): Promise<void> {
    const network = (event.target as HTMLSelectElement).value as Network;
    await this.wallet.switchNetwork(network);
  }
}