import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddInService } from './services/add-in.service';
import { SessionService } from './services/session.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private _tokenService: TokenService, 
    private _activatedRoute: ActivatedRoute, 
    private _sessionService: SessionService,
   private _addIn: AddInService) {
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

}
