import { Routes } from '@angular/router';
import { setupPayloadGuard } from './guards/setup-payload/setup-payload.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
  { path: 'features', loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent), title: 'Features' },
  { path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent), title: 'FAQ' },
  { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent), title: 'Privacy Policy' },
  { path: 'terms-of-service', loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent), title: 'Terms of Service' },
  { path: 'privacy', redirectTo: 'privacy-policy', pathMatch: 'full' },
  { path: 'terms', redirectTo: 'terms-of-service', pathMatch: 'full' },
  { path: 'setup', loadComponent: () => import('./pages/setup/setup.component').then(m => m.SetupComponent), title: 'Setup', canMatch: [setupPayloadGuard] },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Page Not Found' }
];
