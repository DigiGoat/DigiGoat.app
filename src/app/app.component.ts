import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImgDirective } from './directives/img/img.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { AnalyticsComponent } from './features/analytics/analytics.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NgOptimizedImage, ImgDirective, TooltipDirective, AnalyticsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
