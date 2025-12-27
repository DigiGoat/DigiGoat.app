import { Component, inject, ViewChild, type AfterViewInit, type ElementRef, type OnDestroy, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setup',
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent implements OnInit, OnDestroy, AfterViewInit {
  private meta = inject(Meta);
  payload!: string;
  ngOnDestroy() {
    this.meta.removeTag('name=\'robots\'');
  }
  private route = inject(ActivatedRoute);
  ngOnInit() {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
    this.payload = this.route.snapshot.queryParamMap.get('payload')!;
  }
  @ViewChild('deeplink') deeplink!: ElementRef<HTMLAnchorElement>;
  ngAfterViewInit() {
    this.deeplink.nativeElement.click();
  }
}
