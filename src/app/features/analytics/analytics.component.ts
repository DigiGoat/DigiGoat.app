import { Component, ElementRef, inject, type OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { PlatformService } from '../../services/platform/platform.service';

@Component({
  selector: 'analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  private firebaseService = inject(FirebaseService);
  private el = inject(ElementRef<HTMLElement>);
  private platformService = inject(PlatformService);
  private document = this.el.nativeElement.ownerDocument;
  ngOnInit(): void {
    if (this.platformService.isServer) {
      if (this.platformService.isDev) {
        const script = this.document.createComment('Analytics disabled in development mode');
        this.document.head.appendChild(script);
      } else {
        const clarity = 'udczxdpd2n';
        if (clarity) {
          const script = this.document.createElement('script');
          script.innerHTML = `(function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "${clarity}");`;
          this.document.head.appendChild(script);
        }
      }
    } else if (this.platformService.isBrowser) {
      const color = this.document.documentElement.getAttribute('data-bs-theme') == 'light' ? 'Light' : 'Dark';
      if ('clarity' in window) {
        window.clarity('set', 'Color Scheme', color);
      }
      if (!this.platformService.isDev) {
        this.firebaseService.init();
      }
    }
  }
}
