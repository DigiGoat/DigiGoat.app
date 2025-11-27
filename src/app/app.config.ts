import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { TitleStrategy as NgTitleStrategy, provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { TitleStrategy } from './strategies/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), { provide: NgTitleStrategy, useClass: TitleStrategy }, provideClientHydration(withEventReplay())]
};
