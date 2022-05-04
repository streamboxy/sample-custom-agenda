import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService
  ) { 
    this.translate.setDefaultLang(this.translate.getBrowserLang()!);
    this.translate.use(this.translate.getBrowserLang()!);
  }
  
  switchLanguage(langTag: string): void {
    this.translate.use(langTag);
  }
}