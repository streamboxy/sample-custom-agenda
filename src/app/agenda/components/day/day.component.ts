import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SessionResource } from 'src/app/model/session.resource';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  get hasTracks(): boolean {
    return this.tracks.length > 1;
  }

  get tracks(): string[] {
    return [...new Set(this.sessions.map((s) => `${s.description}`))];
  }

  get trackWidth(): string {
    return `${window.innerWidth / this.tracks.length}px`;
  }

  get sessions(): SessionResource[] {
    return this._session.getSessionsByDay(this._day!);
  }

  get isMobile(): boolean {
    return this._device.isMobile() || this._device.isTablet();
  }

  private _day?: string;

  constructor(
    private _route: ActivatedRoute,
    private _session: SessionService,
    private _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('day')) {
        this._day = queryParamMap.get('day') ?? undefined;
      }
    });
  }

  getTrackSessions(track: string): SessionResource[] {
    return this.sessions.filter((p) => p.description === track);
  }

}
