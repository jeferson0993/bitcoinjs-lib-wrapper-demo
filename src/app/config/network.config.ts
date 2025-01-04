import { Network } from '../types/wallet.types';

export const NETWORKS: Record<Network, string> = {
  bitcoin: 'bitcoin',
  testnet: 'testnet'
};

export const NETWORK_LABELS: Record<Network, string> = {
  bitcoin: 'Bitcoin Mainnet',
  testnet: 'Bitcoin Testnet'
};

export const DEFAULT_NETWORK: Network = 'testnet';
export const DEFAULT_GAP_LIMIT = 20;
export const DEFAULT_FEE_RATE = 10; // satoshis/byte