import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScrollspyDirective } from '../../directives/scrollspy/scrollspy.directive';
import { FeaturesService, type FeatureDetails } from '../../services/features/features.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [ScrollspyDirective, RouterModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements OnInit {
  public features: FeatureDetails[] = [];
  private featuresService = inject(FeaturesService);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.features = this.featuresService.getFeaturesDetails();
    const featureNames = this.features.map(f => f.feature);
    const description = 'Explore the comprehensive features of DigiGoat, designed to help ADGA herds create and maintain a beautiful, always-up-to-date website with ease. Some of our key features include: ' + featureNames.slice(0, -1).join(', ') + ', and ' + featureNames[featureNames.length - 1] + '.';
    this.meta.addTags([
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    ]);
  }
}
