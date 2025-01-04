import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeeService, FeeEstimate } from '../../services/fee.service';

@Component({
  selector: 'app-fee-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Transaction Fee
      </label>
      
      <!-- div class="space-y-2">
        @for (option of feeOptions; track option.value) {
          <div class="flex items-center">
            <input
              type="radio"
              [name]="'fee-' + instanceId"
              [id]="'fee-' + option.value + '-' + instanceId"
              [value]="option.value"
              [(ngModel)]="selectedFee"
              (ngModelChange)="feeChange.emit($event)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label
              [for]="'fee-' + option.value + '-' + instanceId"
              class="ml-2 text-sm text-gray-700"
            >
              {{ option.label }}
              ({{ option.value }} sat/byte)
            </label>
          </div>
        }

        <div class="flex items-center">
          <input
            type="radio"
            [name]="'fee-' + instanceId"
            [id]="'fee-custom-' + instanceId"
            value="custom"
            [(ngModel)]="selectedFee"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label
            [for]="'fee-custom-' + instanceId"
            class="ml-2 text-sm text-gray-700"
          >
            Custom
          </label>
          @if (selectedFee === 'custom') {
            <input
              type="number"
              [(ngModel)]="customFeeRate"
              (ngModelChange)="onCustomFeeChange($event)"
              min="1"
              step="1"
              class="ml-2 w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span class="ml-1 text-sm text-gray-500">sat/byte</span>
          }
        </div>
      </div -->
    </div>
  `
})
export class FeeSelectorComponent implements OnInit {
  @Input() initialFee?: number;
  @Output() feeChange = new EventEmitter<number>();

  private feeService = inject(FeeService);
  private readonly instanceId = Math.random().toString(36).slice(2);

  selectedFee: string = 'medium';
  customFeeRate: number = 10;
  feeOptions: { value: number; label: string }[] = [];

  async ngOnInit(): Promise<void> {
    const estimates = await this.feeService.getFeeEstimates();
    this.feeOptions = [
      { value: estimates.fastestFee, label: 'Fast' },
      { value: estimates.halfHourFee, label: 'Medium' },
      { value: estimates.hourFee, label: 'Slow' }
    ];

    if (this.initialFee) {
      const matchingOption = this.feeOptions.find(opt => opt.value === this.initialFee);
      if (matchingOption) {
        this.selectedFee = matchingOption.value.toString();
      } else {
        this.selectedFee = 'custom';
        this.customFeeRate = this.initialFee;
      }
    }
  }

  onCustomFeeChange(value: number): void {
    if (value > 0) {
      this.feeChange.emit(value);
    }
  }
}