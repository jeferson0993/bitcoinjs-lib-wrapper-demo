import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/wallet/wallet.component').then(m => m.WalletComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/create-wallet/create-wallet.component').then(m => m.CreateWalletComponent)
  },
  {
    path: 'restore',
    loadComponent: () => 
      import('./pages/restore-wallet/restore-wallet.component').then(m => m.RestoreWalletComponent)
  }
];