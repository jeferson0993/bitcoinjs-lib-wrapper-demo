import { Network, DerivationPath, Wallet as WalletInterface } from '../shared/utils/bitcoin';

export { Network, DerivationPath, WalletInterface };

export interface Wallet extends WalletInterface {
  path?: string;
  address?: string;
  balance?: number;
  index?: number;
  seed?: string;
  wif: string;
}

export interface Transaction {
  txId: string;
  amount: number;
  type: 'send' | 'receive';
  timestamp: number;
  address: string;
  confirmations: number;
  fee?: number;
  network: Network;
}

export interface WalletState {
  wallets: Array<Wallet>;
  selectedAddress: string;
  mnemonic: string;
  network: Network;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}
