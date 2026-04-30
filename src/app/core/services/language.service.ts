import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private translate = inject(TranslateService);
  currentLanguage = signal('en');

  init() : void {
    const saved = localStorage.getItem('language') || 'en';
    this.currentLanguage.set(saved);
    this.translate.use(saved);
  }

  switchLanguage(lang: 'en' | 'fr'): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  constructor() { }
}
