import { AfterViewInit, booleanAttribute, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ScrollSpy } from 'bootstrap';
import { PlatformService } from '../../services/platform/platform.service';

@Directive({
  selector: '[scrollspy]'
})
export class ScrollspyDirective implements AfterViewInit, OnDestroy {
  private bsScrollspy?: ScrollSpy;
  @Input('scrollspy-rootMargin') rootMargin = '0px 0px -25%';
  @Input({ alias: 'scrollspy-smoothScroll', transform: booleanAttribute }) smoothScroll = true;
  @Input({ alias: 'scrollspy', required: true }) scrollspyTarget!: HTMLElement;
  @Input({ alias: 'scrollspy-threshold' }) threshold: [number, number, number] = [0.1, 0.5, 1];
  @HostBinding('attr.data-bs-spy') spy = 'scroll';
  @HostBinding('attr.data-bs-target') get target(): string {
    return `#${this.scrollspyTarget.id}`;
  }
  private el = inject(ElementRef<HTMLElement>);
  private platformService = inject(PlatformService);
  private route = inject(ActivatedRoute);
  constructor() { }
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.bsScrollspy = bootstrap.ScrollSpy.getOrCreateInstance(this.el.nativeElement, { target: this.scrollspyTarget, rootMargin: this.rootMargin, smoothScroll: this.smoothScroll, threshold: this.threshold });
      const fragment = this.route.snapshot.fragment;
      this.scrollspyTarget.querySelector<HTMLAnchorElement>(`a[href$="#${fragment}"]`)?.click();
    }
  }
  ngOnDestroy(): void {
    this.bsScrollspy?.dispose();
  }
}
