import { AfterViewInit, booleanAttribute, Directive, ElementRef, HostBinding, inject, Input, OnDestroy } from '@angular/core';
import type { ScrollSpy } from 'bootstrap';
import { PlatformService } from '../../services/platform/platform.service';

@Directive({
  selector: '[scrollspy]'
})
export class ScrollspyDirective implements AfterViewInit, OnDestroy {
  private bsScrollspy?: ScrollSpy;
  @Input('scrollspy-rootMargin') rootMargin = '0px 0px -25%';
  @Input({ alias: 'scrollspy-smoothScroll', transform: booleanAttribute }) smoothScroll = true;
  @Input({ alias: 'scrollspy', transform: booleanAttribute, required: true }) scrollspyTarget!: HTMLElement;
  @Input({ alias: 'scrollspy-threshold' }) threshold: [number, number, number] = [0.1, 0.5, 1];
  @HostBinding('attr.data-bs-spy') spy = 'scroll';
  private el = inject(ElementRef<HTMLElement>);
  private platformService = inject(PlatformService);
  constructor() { }
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.bsScrollspy = bootstrap.ScrollSpy.getOrCreateInstance(this.el.nativeElement, { target: this.scrollspyTarget, rootMargin: this.rootMargin, smoothScroll: this.smoothScroll, threshold: this.threshold });
    }
  }
  ngOnDestroy(): void {
    this.bsScrollspy?.dispose();
  }
}
