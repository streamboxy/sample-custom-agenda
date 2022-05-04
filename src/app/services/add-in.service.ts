import { Injectable } from '@angular/core';
import { AddIn, AddInHelper, SBXEventCommandEnum, SBXMessageEvent, SBXMessageType } from '@streamboxy/add-ins';
import { Subject } from 'rxjs';
import { LanguageService } from './language.service';
import { StyleService } from './style.service';

@Injectable({
  providedIn: 'root'
})
export class AddInService {
 private _addIn!: AddIn;

 private _eventSubject: Subject<SBXMessageEvent> = new Subject<SBXMessageEvent>();

 get onEvent(): Subject<SBXMessageEvent> {
    return this._eventSubject;
 }

  constructor( private _languageService: LanguageService, private _styleService: StyleService ) { 
  }

  public init(): void {
    this._addIn = new AddIn("v1", AddInHelper.parseOriginURLFromSearchParam('origin'));
    
    this._addIn.subscribeToCore(this.processMessage.bind(this));
  }

  public sendCommand(command: SBXEventCommandEnum, target: string): void {
    this._addIn.sendCommandToCore(command, target);
  }
  
  private processMessage(event: SBXMessageEvent): void {
    switch (event.type) {
      case SBXMessageType.Notice: {
        break;
      }
      case SBXMessageType.SessionStyle: {
        const style = event.data;
        this._styleService.setStyling(style);
        
        break;
      }
      case SBXMessageType.Language: {
        const langTag = event?.data?.split('-')[0] ?? event?.data;
        this._languageService.switchLanguage(langTag);

        break;
      }
      case SBXMessageType.UserContext: {
        break;
      }
      case SBXMessageType.SessionData: {
        break;
      }
      default: {
        break;
      }
    }
  }

  
}
