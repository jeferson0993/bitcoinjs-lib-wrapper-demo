import { Injectable } from '@angular/core';
import { Network, Wallet, WalletInterface, DerivationPath } from '../types/wallet.types';

// import { BTC } from 'bitcoinjs-lib-wrapper';
declare var BTC: any;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  async generateHDWallet(mnemonic: string,
    networkInput: Network,
    deriv: DerivationPath,
    account: number = 0,
    change: number = 0,
    index: number = 0
  ): Promise<Wallet> {
    const { seedHex: seed } = await BTC.createSeedHexFromMnemonic(mnemonic);
    const bech32Wallet: WalletInterface = await BTC.createHDWallet(seed, deriv, account, change, index, networkInput);
    const wallet: Wallet = { index, balance: 0, ...bech32Wallet }

    return wallet;
  }

  async generateMnemonic(): Promise<string> {
    const { mnemonic } = BTC.createMnemonic();
    return mnemonic;
  }

  validateAddress(address: string, network: Network): boolean {
    return BTC.isValidAddress(address, network);
  }
}

