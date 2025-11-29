import { Component, inject, type OnInit } from '@angular/core';
import { FaqService, type FAQ } from '../../services/faq/faq.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [RouterModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  public faqs: FAQ[] = [];

  private faqService = inject(FaqService);
  ngOnInit(): void {
    this.faqs = this.faqService.getFaqs();
  }
}
