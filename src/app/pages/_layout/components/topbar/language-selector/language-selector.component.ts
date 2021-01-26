import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../../../../../modules/i18n/translation.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  language: LanguageFlag;
  langIsAr: boolean;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/226-united-states.svg',
    },
    {
      lang: 'ar',
      name: 'Arabic',
      flag: './assets/media/svg/flags/158-egypt.svg',
    },
  ];
  constructor(
    private translationService: TranslationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    if (lang !== 'ar' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.getElementsByTagName('html')[0].removeAttribute('direction');
      this.langIsAr = false;
    } else if (lang === 'ar' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('direction', 'rtl');
      this.langIsAr = true;
    }
    localStorage.setItem('lang', lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
