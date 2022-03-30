import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, firstValueFrom, Observable } from 'rxjs';
import { SessionResource } from '../model/session.resource';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  get isMultiTrack(): boolean {
    return true;
  }

  get isMultiDay(): boolean {
    return this.days.length > 1;
  }

  get days(): string[] {
    return [...new Set(this._sessions?.map((s) => moment(s.startDateTimeUtc).toISOString().split('T')[0]))].sort();
  }

  private _sessions?: SessionResource[];

  constructor(
    private _http: HttpClient
  ) { }

  public getSessionsByDay(day: string): SessionResource[] {
    return this._sessions?.filter((p) => moment(p.startDateTimeUtc).isSame(moment(day), 'day')) ?? [];
  }

  public getSessionsBefore(session: SessionResource): SessionResource[] {
    return this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!.filter((p) =>
      session.customProperties?.stageTrack == p.customProperties?.stageTrack &&
      moment(session.endDateTimeUtc).isAfter(moment(p.startDateTimeUtc))
    );
  }

  public getOffsetToPreviousSessionInHours(session: SessionResource): number {
    const previousSession = this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!
      .filter((p) => session.customProperties?.stageTrack == p.customProperties?.stageTrack)
      .sort((p) => moment(session.endDateTimeUtc).diff(p.startDateTimeUtc))
      .filter((p) => moment(p.startDateTimeUtc).isBefore(session.endDateTimeUtc))
      .filter((p) => p.id != session.id);

    if (previousSession.length > 0) {
      const duration = moment.duration(moment(session.startDateTimeUtc).diff(moment(previousSession[0].endDateTimeUtc)));

      return duration.asHours();
    } else {
      return 0;
    }
  }

  public getStartOffset(session: SessionResource): number {
    const sortedSessions = this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!
      .sort((a) => moment(a.startDateTimeUtc).valueOf());

    const firstSessionPerTrack = this._distinctByTrack(sortedSessions)
      .sort((a) => moment(a.startDateTimeUtc).valueOf());

    if (firstSessionPerTrack.find((p) => p.id === session.id) === undefined) {
      return 0;
    }

    if (firstSessionPerTrack.length > 0) {
      const duration = moment.duration(moment(session.startDateTimeUtc).diff(moment(firstSessionPerTrack[0].startDateTimeUtc)));

      return duration.asHours();
    } else {
      return 0;
    }
  }

  public async getSessions(): Promise<void> {
    this._sessions = await firstValueFrom(this._getSessionsFromJSON().pipe(delay(750)));
  }

  private _getSessionsFromJSON(): Observable<SessionResource[]> {
    return this._http.get<SessionResource[]>('./assets/data/sessions.json');
  }

  private _distinctByTrack(array: SessionResource[]): SessionResource[] {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.customProperties?.stageTrack)) {
        map.set(item.customProperties?.stageTrack, true);    // set any value to Map
        result.push(item);
      }
    }

    return result;
  }
}
