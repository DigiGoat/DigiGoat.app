import { Injectable } from '@angular/core';
import faq from '../../../assets/resources/faq.json';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private faqs: FAQ[] = faq;
  getFaqs(): FAQ[] {
    return this.faqs;
  }
  constructor() { }
}

export interface FAQ {
  q: string;
  a: string;
  id: string;
}
