import { Injectable } from '@angular/core';
import { DEFAULT_FEE_RATE } from '../config/network.config';

export interface FeeEstimate {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private cachedFees: FeeEstimate | null = null;
  private lastFetchTime = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getFeeEstimates(): Promise<FeeEstimate> {
    if (this.shouldUseCachedFees()) {
      return this.cachedFees!;
    }

    try {
      // In a real app, fetch from a fee estimation API
      // For demo, return static values
      const fees: FeeEstimate = {
        fastestFee: DEFAULT_FEE_RATE * 2,
        halfHourFee: DEFAULT_FEE_RATE,
        hourFee: DEFAULT_FEE_RATE / 2
      };

      this.cachedFees = fees;
      this.lastFetchTime = Date.now();
      return fees;
    } catch {
      return {
        fastestFee: DEFAULT_FEE_RATE,
        halfHourFee: DEFAULT_FEE_RATE,
        hourFee: DEFAULT_FEE_RATE
      };
    }
  }

  private shouldUseCachedFees(): boolean {
    return (
      this.cachedFees !== null &&
      Date.now() - this.lastFetchTime < this.CACHE_DURATION
    );
  }
}