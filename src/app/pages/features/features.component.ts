import { Component } from '@angular/core';
import { ScrollspyDirective } from '../../directives/scrollspy/scrollspy.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [ScrollspyDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}
