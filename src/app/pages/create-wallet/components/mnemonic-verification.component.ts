import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mnemonic-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="bg-blue-50 p-4 rounded-md">
        <p class="text-blue-800">
          Please verify your recovery phrase by entering the requested words
          in the correct order.
        </p>
      </div>

      <form [formGroup]="verificationForm" (ngSubmit)="verify()" class="space-y-4">
        @for (word of wordPrompts; track word.index) {
          <div class="space-y-2">
            <label [for]="'word-' + word.index" class="block text-sm font-medium text-gray-700">
              Word #{{ word.index + 1 }}
            </label>
            <input
              [id]="'word-' + word.index"
              type="text"
              [formControlName]="'word' + word.index"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              autocomplete="off"
              spellcheck="false"
            />
          </div>
        }

        @if (error) {
          <div class="p-4 bg-red-100 text-red-700 rounded-md">
            {{ error }}
          </div>
        }

        <div class="flex justify-between pt-4">
          <button
            type="button"
            (click)="reset.emit()"
            class="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Start Over
          </button>
          <button
            type="submit"
            [disabled]="!verificationForm.valid"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  `
})
export class MnemonicVerificationComponent {
  @Input({ required: true }) set originalMnemonic(value: string) {
    this._originalMnemonic = value;
    this.generateWordPrompts();
  }
  @Output() verified = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  private _originalMnemonic = '';
  private formBuilder = new FormBuilder();
  
  wordPrompts: { index: number }[] = [];
  error = '';

  verificationForm = this.formBuilder.group({});

  private generateWordPrompts(): void {
    const words = this._originalMnemonic.split(' ');
    const indices = new Set<number>();
    
    // Generate 3 random unique indices
    while (indices.size < 3) {
      indices.add(Math.floor(Math.random() * words.length));
    }

    this.wordPrompts = Array.from(indices).map(index => ({ index }));
    
    // Create form controls
    const group: { [key: string]: any } = {};
    this.wordPrompts.forEach(prompt => {
      group[`word${prompt.index}`] = ['', Validators.required];
    });
    
    this.verificationForm = this.formBuilder.group(group);
  }

  verify(): void {
    if (!this.verificationForm.valid) return;

    const words = this._originalMnemonic.split(' ');
    let isValid = true;

    this.wordPrompts.forEach(prompt => {
      const enteredWord = this.verificationForm.get(`word${prompt.index}`)?.value;
      if (enteredWord !== words[prompt.index]) {
        isValid = false;
      }
    });

    if (isValid) {
      this.verified.emit();
    } else {
      this.error = 'The entered words do not match your recovery phrase. Please try again.';
    }
  }
}