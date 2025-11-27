import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, isDevMode } from '@angular/core';
import { isbot } from 'isbot';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private platformId = inject(PLATFORM_ID);


  public isServer = isPlatformServer(this.platformId);
  public isBrowser = isPlatformBrowser(this.platformId);
  public isBot = this.isBrowser && isbot(navigator.userAgent);
  public isDev = isDevMode();
}
