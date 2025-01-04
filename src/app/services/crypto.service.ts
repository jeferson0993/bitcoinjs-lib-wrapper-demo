import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly ENCRYPTION_KEY = 'WALLET_ENCRYPTION_KEY';

  private getOrCreateEncryptionKey(): string {
    let key = localStorage.getItem(this.ENCRYPTION_KEY);
    if (!key) {
      key = CryptoJS.lib.WordArray.random(256/8).toString();
      localStorage.setItem(this.ENCRYPTION_KEY, key);
    }
    return key;
  }
  
  encrypt(data: string): string {
    const key = this.getOrCreateEncryptionKey();
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  decrypt(encryptedData: string): string {
    const key = this.getOrCreateEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}