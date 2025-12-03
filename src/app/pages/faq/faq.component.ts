import { Component, inject, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FaqService, type FAQ } from '../../services/faq/faq.service';

@Component({
  selector: 'app-faq',
  imports: [RouterModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  public faqs: FAQ[] = [];

  private faqService = inject(FaqService);
  private meta = inject(Meta);
  ngOnInit(): void {
    this.faqs = this.faqService.getFaqs();
    const faqTopics = this.faqs.map(f => f.q);
    const description = 'Find answers to common questions about DigiGoat, including topics such as: "' + faqTopics.slice(0, -1).join('", "') + '", and "' + faqTopics[faqTopics.length - 1] + '"';
    this.meta.addTags([
      { name: 'description', content: description },
      { property: 'og:description', content: description },
    ]);
  }
}
