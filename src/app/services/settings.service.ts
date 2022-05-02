import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../model/app-settings.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _settings!: AppSettings;

  constructor(private http: HttpClient) { 
  }

  async load() {
    const settings$ =  this.http.get('assets/app.settings.json');
    this._settings = await lastValueFrom(settings$) as AppSettings;
  }

  get settings(): AppSettings {
    return this._settings;
  }
}