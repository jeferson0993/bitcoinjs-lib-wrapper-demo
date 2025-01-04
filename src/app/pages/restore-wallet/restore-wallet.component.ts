import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

@Component({
  selector: 'app-restore-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Restore Wallet</h1>

      <div class="bg-blue-50 p-4 rounded-md mb-6">
        <p class="text-blue-800">
          Enter your 12-word recovery phrase to restore your wallet.
          Make sure you're in a private location and no one can see your screen.
        </p>
      </div>

      <form [formGroup]="restoreForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Recovery Phrase
          </label>
          <textarea
            formControlName="mnemonic"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your 12 words separated by spaces"
          ></textarea>
          @if (restoreForm.get('mnemonic')?.errors?.['required'] && restoreForm.get('mnemonic')?.touched) {
            <p class="text-sm text-red-600">Recovery phrase is required</p>
          }
          @if (restoreForm.get('mnemonic')?.errors?.['invalidFormat']) {
            <p class="text-sm text-red-600">
              Please enter exactly 12 words separated by spaces
            </p>
          }
        </div>

        @if (error) {
          <div class="p-4 bg-red-100 text-red-700 rounded-md">
            {{ error }}
          </div>
        }

        <div class="flex justify-between">
          <button
            type="button"
            routerLink="/"
            class="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="!restoreForm.valid || isLoading"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            @if (isLoading) {
              <app-loading-spinner />
            } @else {
              Restore Wallet
            }
          </button>
        </div>
      </form>
    </div>
  `
})
export class RestoreWalletComponent {
  private fb = inject(FormBuilder);
  private wallet = inject(WalletService);
  private router = inject(Router);

  isLoading = false;
  error = '';

  restoreForm = this.fb.group({
    mnemonic: ['', [Validators.required, this.validateMnemonic]]
  });

  private validateMnemonic(control: { value: string }): { [key: string]: boolean } | null {
    const words = control.value.trim().split(/\s+/);
    return words.length === 12 ? null : { invalidFormat: true };
  }

  async onSubmit(): Promise<void> {
    if (!this.restoreForm.valid) return;

    this.isLoading = true;
    this.error = '';

    try {
      await this.wallet.restoreWallet(this.restoreForm.get('mnemonic')?.value?.trim() || '');
      await this.router.navigate(['/']);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to restore wallet';
    } finally {
      this.isLoading = false;
    }
  }
}