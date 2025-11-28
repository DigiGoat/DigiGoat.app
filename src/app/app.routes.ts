import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
  { path: 'features', loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent), title: 'Features' },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Page Not Found' }
];
