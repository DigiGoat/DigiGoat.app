import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private meta = inject(Meta);
  constructor() { }
  ngOnInit(): void {
    this.setDescription();
  }
  setDescription(): void | Observable<void> {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
