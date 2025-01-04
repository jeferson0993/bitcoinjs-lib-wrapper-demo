import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly WALLET_KEY = 'WALLET_DATA';

  constructor(private cryptoService: CryptoService) {}

  private saveData(key: string, data: any): void {
    const serializedData = JSON.stringify(data);
    const encryptedData = this.cryptoService.encrypt(serializedData);
    localStorage.setItem(key, encryptedData);
  }

  private getData<T>(key: string): T | null {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;

    try {
      const decryptedData = this.cryptoService.decrypt(encryptedData);
      return JSON.parse(decryptedData);
    } catch {
      return null;
    }
  }

  saveWalletData(data: any): void {
    this.saveData(this.WALLET_KEY, data);
  }

  getWalletData<T>(): T | null {
    return this.getData<T>(this.WALLET_KEY);
  }

  clearWalletData(): void {
    localStorage.removeItem(this.WALLET_KEY);
  }
}