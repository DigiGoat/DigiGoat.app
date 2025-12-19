import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  imports: [RouterModule],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.scss'
})
export class TermsOfServiceComponent implements OnInit {
  public lastUpdated = 'December 18, 2025';

  private meta = inject(Meta);
  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: `These terms of service, last updated on ${this.lastUpdated}, govern your access to and use of DigiGoat, including the DigiGoat website, applications, and related services.` });
  }
}
