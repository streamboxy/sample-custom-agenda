import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SessionResource } from 'src/app/model/session.resource';
import { SessionService } from 'src/app/services/session.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  get hasTracks(): boolean {
    return this.tracks.length > 1 && this._settings.settings.tracksActivated;
  }

  get tracks(): string[] {
    return [...new Set(this.sessions.map((s) => `${s.description}`))];
  }

  get trackWidth(): string {
    return `${window.innerWidth / this.tracks.length}px`;
  }

  get isMobile(): boolean {
    return this._device.isMobile() || this._device.isTablet();
  }

  private _day?: string;

   sessions: SessionResource[] = [];
   parallelSessions: SessionResource[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _session: SessionService,
    private _device: DeviceDetectorService,
    private _settings: SettingsService
  ) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('day')) {
        this._day = queryParamMap.get('day') ?? undefined;
        setTimeout(() => {
        this.sessions = this._session.getSessionsByDayandFilteredWithParallelSessions(this._day!) ?? [];
        this.parallelSessions = this._session.getParallelSessions(this._session.getSessionsByDay(this._day!)!) ?? [];
        }, 400)
      }
    });
 
  }

  getTrackSessions(track: string): SessionResource[] {
    return this.sessions.filter((p) => p.description === track);
  }
}
