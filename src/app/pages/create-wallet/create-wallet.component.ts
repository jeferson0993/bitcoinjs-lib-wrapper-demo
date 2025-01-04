import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet.service';
import { MnemonicDisplayComponent } from './components/mnemonic-display.component';
import { MnemonicVerificationComponent } from './components/mnemonic-verification.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

@Component({
  selector: 'app-create-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MnemonicDisplayComponent,
    MnemonicVerificationComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Create New Wallet</h1>

      @if (isLoading) {
        <div class="flex justify-center">
          <app-loading-spinner />
        </div>
      } @else if (!mnemonic) {
        <div class="text-center">
          <p class="mb-4 text-gray-600">
            Create a new Bitcoin wallet with a secure recovery phrase.
          </p>
          <button
            (click)="generateWallet()"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            [disabled]="isLoading"
          >
            Generate Wallet
          </button>
        </div>
      } @else if (!isVerified) {
        <app-mnemonic-display
          [mnemonic]="mnemonic"
          (continue)="startVerification()"
        />
      } @else {
        <app-mnemonic-verification
          [originalMnemonic]="mnemonic"
          (verified)="completeSetup()"
          (reset)="resetVerification()"
        />
      }

      @if (error) {
        <div class="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
      }
    </div>
  `
})
export class CreateWalletComponent {
  private wallet = inject(WalletService);
  private router = inject(Router);

  mnemonic = '';
  isLoading = false;
  isVerified = false;
  error = '';

  async generateWallet(): Promise<void> {
    this.isLoading = true;
    this.error = '';
    try {
      const walletState = await this.wallet.generateWallet();
      const { mnemonic } = walletState;
      this.mnemonic = <string> mnemonic;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to generate wallet';
    } finally {
      this.isLoading = false;
    }
  }

  startVerification(): void {
    this.isVerified = true;
  }

  resetVerification(): void {
    this.mnemonic = '';
    this.isVerified = false;
  }

  async completeSetup(): Promise<void> {
    try {
      await this.router.navigate(['/']);
    } catch (err) {
      this.error = 'Failed to complete wallet setup';
    }
  }
}