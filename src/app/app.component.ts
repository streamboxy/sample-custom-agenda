import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AddIn, AddInHelper, SBXMessageEvent, SBXMessageType } from '@streamboxy/add-ins';
import { AddInService } from './services/add-in.service';
import { LanguageService } from './services/language.service';
import { SessionService } from './services/session.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private addIn?: AddIn;

  currentLanguage = 'de';

  constructor(private _tokenService: TokenService, 
    private _activatedRoute: ActivatedRoute, 
    private _sessionService: SessionService,
    private _translateService: TranslateService,
   private _addIn: AddInService) {
    this.setLanguage();
    //this.setStyling();
    this._activatedRoute.queryParams.subscribe((params) => {
      let token = params['token'];
      let eventId = params['eventId'];
      let tenantId = params['tenantId'];
      this._tokenService.setToken(token);
      this._sessionService.setEventId(eventId);
      this._sessionService.setTenantId(tenantId);

    })
  }

  ngAfterViewInit(): void {
   this._addIn.init();
  }

  

  

  private setLanguage() {
    this.currentLanguage = this._translateService.getBrowserLang()!.toLowerCase().includes('de') ? 'de' : 'en';
    this._translateService.setDefaultLang(this.currentLanguage);
    this._translateService.use(this.currentLanguage);
  }
}
