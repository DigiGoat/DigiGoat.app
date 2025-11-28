import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImgDirective } from '../../directives/img/img.directive';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, ImgDirective, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
