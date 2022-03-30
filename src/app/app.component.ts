import { AfterViewInit, Component } from '@angular/core';
import { AddIn, AddInHelper, SBXMessageEvent, SBXMessageType } from '@streamboxy/add-ins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private addIn?: AddIn;

  constructor() {
    this.setStyling();
  }

  ngAfterViewInit(): void {
    this.addIn = new AddIn("v1", AddInHelper.parseOriginURLFromSearchParam('origin'));

    this.addIn.subscribeToCore(this.processMessage.bind(this));
  }

  private processMessage(event: SBXMessageEvent): void {
    switch (event.type) {
      case SBXMessageType.Notice: {
        break;
      }
      case SBXMessageType.SessionStyle: {
        const style = event.data;
        this.setStyling(style);
        
        break;
      }
      case SBXMessageType.Language: {
        const langTag = event?.data?.split('-')[0] ?? event?.data;
        console.log('Lang changed,', langTag);

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

  private setStyling(style?: any): void {
    this.setStyleOnRoot('accent', style?.accentColor ? style?.accentColor : '#ed6c05');
    this.setStyleOnRoot('text', style?.textColor ? style?.textColor : '#ffffff');
    this.setStyleOnRoot('background', style?.backgroundColor ? style?.backgroundColor : '#292929');
    this.setStyleOnRoot('canvas', style?.canvasColor ? style?.canvasColor : '#252525');

    if (style?.textFontUrl || style?.titleFontUrl) {
      this.setFontsOnRoot(style.titleFontUrl, style.textFontUrl);
    }
  }

  private setStyleOnRoot(varName: string, varValue: string): void {
    document.documentElement.style.setProperty(`--${varName}`, varValue);
  }

  private setFontsOnRoot(title: string, text: string): void {
    const font = `
    @font-face {
      font-family: 'Standard';
      src: url('${text}') format('woff2');
      font-weight: 300;
    }

    @font-face {
      font-family: 'Standard';
      src: url('${title}') format('woff2');
      font-weight: 600,700,800,900;
    }`;

    const node = document.createElement('style');
    node.innerHTML = font;
    document.body.appendChild(node);
  }
}
