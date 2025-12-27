import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScrollspyDirective } from '../../directives/scrollspy/scrollspy.directive';
import { GetStartedService, type StepDetails } from '../../services/get-started/get-started.service';

@Component({
  selector: 'app-get-started',
  imports: [RouterModule, ScrollspyDirective],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss'
})
export class GetStartedComponent implements OnInit {
  public steps: StepDetails[] = [];
  private getStartedService = inject(GetStartedService);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.steps = this.getStartedService.getSteps();
    const stepNames = this.steps.map(s => s.step);
    const description = 'Explore the step by step guide for DigiGoat, designed to help ADGA herds create and maintain a beautiful, always-up-to-date website with ease. Steps include: ' + stepNames.join(', ') + '.';
    this.meta.addTags([
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    ]);
  }
}
