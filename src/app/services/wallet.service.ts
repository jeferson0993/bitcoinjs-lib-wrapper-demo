import { Injectable, computed, signal } from '@angular/core';
import { AddressService } from './address.service';
import { StorageService } from './storage.service';
import { FeeService } from './fee.service';
import { DEFAULT_NETWORK } from '../config/network.config';
import { WalletState, Network, Wallet, DerivationPath } from '../types/wallet.types';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private walletState = signal<WalletState>({
    wallets: [],
    selectedAddress: '',
    mnemonic: '',
    network: DEFAULT_NETWORK,
    transactions: [],
    isLoading: false,
    error: null
  });

  // Public signals
  readonly wallets = computed(() => this.walletState().wallets);
  readonly mnemonic = computed(() => this.walletState().mnemonic);
  readonly selectedAddress = computed(() => this.walletState().selectedAddress);
  readonly network = computed(() => this.walletState().network);
  readonly transactions = computed(() => this.walletState().transactions);
  readonly isLoading = computed(() => this.walletState().isLoading);
  readonly error = computed(() => this.walletState().error);

  // Computed total balance across all addresses
  readonly totalBalance = computed(() =>  0
    //this.wallets().reduce((sum, addr) => sum + (addr.balance ? addr.balance : 0), 0)
  );

  deriv: DerivationPath = 84;

  constructor(
    private addressService: AddressService,
    private storageService: StorageService,
    private feeService: FeeService
  ) {
    this.initializeWallet();
  }

  setSelectedAddress(selectedAddress: string): void {
    this.walletState.update(state => ({
      ...state,
      selectedAddress
    }))
  }

  async generateNewAddress(): Promise<void> {
    let walletState = this.walletState();
    let { mnemonic, wallets } = walletState;
    let bech32Wallet = await this.addressService.generateHDWallet(mnemonic, this.network(), this.deriv, 0, 0, wallets.length);
    const { p2wpkh } = bech32Wallet;
    const selectedAddress = p2wpkh!
    wallets = [ bech32Wallet, ...wallets ];
    walletState = { ...walletState, wallets, selectedAddress, mnemonic };
    this.walletState.update(() => (walletState));
  }

  async generateWallet(): Promise<WalletState> {
    const mnemonic = await this.addressService.generateMnemonic(); console.assert(mnemonic);
    const wallet = await this.addressService.generateHDWallet(mnemonic, this.network(), this.deriv); console.assert(wallet);
    let wallets: Array<Wallet> = [];
    wallets = [wallet, ...wallets]; console.assert(wallets);
    const { p2wpkh } = wallet;
    const selectedAddress = p2wpkh!

    if (!selectedAddress) return this.walletState();

    this.walletState.update(state => ({ ...state, wallets, selectedAddress, mnemonic }));
    console.log(this.walletState());

    return this.walletState();
  }

  async restoreWallet(mnemonic: string): Promise<void> {
    try {
      const wallet = await this.addressService.generateHDWallet(mnemonic, this.network(), this.deriv, 0, 0, 0);
      const { address } = wallet;
      if (!address) return;
      const selectedAddress = address;
      this.walletState.update(state => ({ ...state, wallet, selectedAddress, mnemonic }));

      await this.refreshWalletData();
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to restore wallet');
    }
  }

  async switchNetwork(network: Network): Promise<void> {
    this.walletState.update(state => ({
      ...state,
      network,
      isLoading: true
    }));

    try {
      await this.refreshWalletData();
    } catch (error) {
      this.setError('Failed to switch network');
    }
  }

  private async refreshWalletData(): Promise<void> {
    const wallet: Wallet = await this.addressService.generateHDWallet(this.mnemonic(), this.network(), this.deriv);

    // TODO: fetch balances and transactions from a Bitcoin node or API

    const { p2wpkh } = wallet;
    if (!p2wpkh) return;
    const wallets: Array<Wallet> = [wallet];

    this.walletState.update(state => ({
      ...state,
      ...wallet,
      wallets,
      selectedAddress: p2wpkh,
      isLoading: false
    }));

    console.log({ 'state': this.walletState() });
    this.storageService.saveWalletData(this.walletState());
  }

  private setError(message: string): void {
    this.walletState.update(state => ({
      ...state,
      error: message,
      isLoading: false
    }));
  }

  private initializeWallet(): void {
    const data = this.storageService.getWalletData<WalletState>();
    if (data) {
      this.walletState.set(data);
      this.refreshWalletData();
    }
  }

  signOut(): void {
    this.walletState.set({
      wallets: [],
      selectedAddress: '',
      mnemonic: '',
      network: DEFAULT_NETWORK,
      transactions: [],
      isLoading: false,
      error: null,
    });

    this.storageService.clearWalletData();
  }
}