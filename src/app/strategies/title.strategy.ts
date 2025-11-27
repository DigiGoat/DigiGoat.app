import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TitleStrategy as NgTitleStrategy, type RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../services/firebase/firebase.service';
import { PlatformService } from '../services/platform/platform.service';

@Injectable({ providedIn: 'root' })
export class TitleStrategy extends NgTitleStrategy {
  private readonly title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PlatformService);
  private firebase = inject(FirebaseService);

  private readonly tags = ['og:title', 'og:url', 'og:site_name', 'og:type', 'og:description', 'og:image', 'og:image:alt', 'description'];
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.tags.forEach(tag => this.meta.getTags(`name="${tag}"`).forEach(_tag => this.meta.removeTagElement(_tag)));
    this.tags.forEach(tag => this.meta.getTags(`property="${tag}"`).forEach(_tag => this.meta.removeTagElement(_tag)));

    if (title !== undefined) {
      const titlePrefix = this.formatTitle(title, routerState);
      this.title.setTitle(`${titlePrefix} · DigiGoat`);
      this.meta.addTags([
        { property: 'og:title', content: titlePrefix.split(' · ').shift()! },
        { property: 'og:url', content: (new URL(`.${routerState.url}`, 'https://digigoat.app')).toString() },
        { property: 'og:site_name', content: 'DigiGoat' },
        { property: 'og:type', content: 'website' },
        { name: 'apple-mobile-web-app-title', content: 'DigiGoat' }
      ]);
    } else {
      this.title.setTitle('DigiGoat');
    }
    if (this.platform.isBrowser && !this.platform.isDev) {
      this.firebase.logEvent('page_event', {
        page_path: routerState.url
      });
    }
  }
  formatTitle(title: string, routerState: RouterStateSnapshot): string {
    return title.replace(/(^|\s):(\w+)(\s|$)/g, (_match, prefix, id, suffix) => {
      return `${prefix}${this.getParam(id, routerState)}${suffix}`;
    }).replaceAll('-', '·');
  }
  getParam(param: string, routerState: RouterStateSnapshot) {
    function findParams(children: RouterStateSnapshot['root']['children']): Record<string, string> {
      const paramObj = {};
      if (children[0]?.children.length) {
        Object.assign(paramObj, findParams(children[0].children));
      }
      return Object.assign(paramObj, children[0]?.params);
    }
    const paramMap = findParams(routerState.root.children);
    return (paramMap[param]?.replaceAll('-', ' ') ?? `:${param}`);
  }
}
