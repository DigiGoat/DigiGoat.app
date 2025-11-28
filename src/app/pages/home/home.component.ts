import { NgOptimizedImage } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.features = this.featuresService.getFeaturesSummary();
  }
}
