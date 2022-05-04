import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  get sbxStyle(): any {
    return this._sbxStyle;
  }

  private _sbxStyle: any;

  constructor() { 
    this.setStyling(this.sbxStyle);
  }
  
   setStyling(style?: any): void {
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
