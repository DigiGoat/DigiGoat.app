import { NgOptimizedImage } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ImgDirective } from '../../directives/img/img.directive';
import { FeaturesService, type FeatureSummary } from '../../services/features/features.service';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, ImgDirective, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public features: FeatureSummary[] = [];

  private featuresService = inject(FeaturesService);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.features = this.featuresService.getFeaturesSummary();
    const description = 'An app to merge the gap between ADGA, your farm, and the internet. Build a beautiful, always-up-to-date website for your herd in minutes — no web design experience required. DigiGoat is built specifically for ADGA herds, so your website works the way you do.';
    this.meta.addTags([
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    ]);
  }
}
