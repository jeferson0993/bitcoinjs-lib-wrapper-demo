import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-send-bitcoin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="sendForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <h2 class="text-xl font-semibold mb-4">Send Bitcoin</h2>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          formControlName="address"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Amount (BTC)
        </label>
        <input
          type="number"
          formControlName="amount"
          step="0.00000001"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        [disabled]="!sendForm.valid || wallet.isLoading()"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        Send
      </button>

      @if (wallet.error()) {
        <div class="text-red-600 text-sm mt-2">
          {{ wallet.error() }}
        </div>
      }
    </form>
  `
})
export class SendBitcoinComponent {
  private fb = inject(FormBuilder);
  wallet = inject(WalletService);

  sendForm = this.fb.group({
    address: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.00000001)]]
  });

  onSubmit(): void {
    if (this.sendForm.valid) {
      // Implement send transaction logic
      console.log('Sending transaction:', this.sendForm.value);
    }
  }
}