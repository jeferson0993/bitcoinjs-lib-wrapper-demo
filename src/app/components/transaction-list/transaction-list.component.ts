import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../types/wallet.types';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (transactions.length) {
      <div class="divide-y">
        @for (tx of transactions; track tx.txId) {
          <div class="py-4 flex items-center justify-between">
            <div>
              <div class="font-medium">
                {{ tx.type === 'receive' ? 'Received' : 'Sent' }}
                {{ tx.amount }} BTC
              </div>
              <div class="text-sm text-gray-500">
                {{ tx.address }}
              </div>
              <div class="text-sm text-gray-500">
                {{ tx.timestamp | date:'medium' }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">
                {{ tx.confirmations }} confirmations
              </div>
            </div>
          </div>
        }
      </div>
    } @else {
      <div class="text-center py-8 text-gray-500">
        No transactions yet
      </div>
    }
  `
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
}