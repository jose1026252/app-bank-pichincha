import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
  },
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'private',
    pathMatch: 'full'
  }
];
