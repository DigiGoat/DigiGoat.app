import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  public lastUpdated = 'December 18, 2025';

  private meta = inject(Meta);
  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description', content: `This privacy policy, last updated on ${this.lastUpdated}, explains how DigiGoat collects, uses, and shares information when you use the services.`
    });
  }
}
