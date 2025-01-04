import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mnemonic-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="bg-yellow-50 p-4 rounded-md">
        <h2 class="text-lg font-semibold text-yellow-800 mb-2">
          Important Security Notice
        </h2>
        <ul class="list-disc list-inside text-yellow-700 space-y-2">
          <li>Write down these words in the exact order</li>
          <li>Store them in a secure location</li>
          <li>Never share your recovery phrase</li>
          <li>Lost phrases cannot be recovered</li>
        </ul>
      </div>

      <div 
        class="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg"
        data-testid="mnemonic-display"
      >
        @for (word of mnemonicWords; track word.index) {
          <div class="flex items-center space-x-2 p-2 bg-white rounded shadow-sm">
            <span class="text-gray-500 text-sm">{{ word.index + 1 }}.</span>
            <span class="font-mono">{{ word.value }}</span>
          </div>
        }
      </div>

      <div class="flex justify-between items-center">
        <button
          (click)="copyToClipboard()"
          class="px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          Copy to Clipboard
        </button>
        <button
          (click)="continue.emit()"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          data-testid="confirm-mnemonic"
        >
          I've Saved These Words
        </button>
      </div>
    </div>
  `
})
export class MnemonicDisplayComponent {
  @Input({ required: true }) set mnemonic(value: string) {
    this._mnemonic = value;
    this.mnemonicWords = value.split(' ').map((word, index) => ({
      index,
      value: word
    }));
  }
  get mnemonic(): string {
    return this._mnemonic;
  }

  @Output() continue = new EventEmitter<void>();

  private _mnemonic = '';
  mnemonicWords: { index: number; value: string }[] = [];

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.mnemonic);
  }
}