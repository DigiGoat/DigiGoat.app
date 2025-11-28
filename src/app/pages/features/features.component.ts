import { Component, inject, type OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.features = this.featuresService.getFeaturesDetails();
  }
}
