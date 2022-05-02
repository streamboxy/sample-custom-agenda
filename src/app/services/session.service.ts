import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionResource } from '../model/session.resource';
import * as moment from 'moment';
import { SettingsService } from './settings.service';
import { PagedResult } from '../model/paged-result.model';

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
    return this._days;
  }


  private _sessions?: SessionResource[];
  public _days!: string[];
  private _tenantId!: string;
  private _eventId!: string;

  get parallelSessions(): SessionResource[] | undefined {
    if(this._parallelSessions.length > 0)
    return this._parallelSessions;
    else{
      return undefined
    }
  }

  private _parallelSessions: SessionResource[] = [];

  constructor(
    private _http: HttpClient,
    private _settings: SettingsService
  ) { }

  public getSessionsByDay(day: string): SessionResource[] | undefined {
      return this._sessions?.filter((p) => moment(p.startDateTimeUtc).isSame(moment(day), 'day')) ?? [];
  }

  public getSessionsByDayandFilteredWithParallelSessions(day: string): SessionResource[] | undefined {
    let parallelSessions = this.getParallelSessions(this.getSessionsByDay(day)!);
    if(parallelSessions?.length == 0){
      return this._sessions?.filter((p) => moment(p.startDateTimeUtc).isSame(moment(day), 'day')) ?? [];
    }
    else {
      return this._sessions?.filter((p) => moment(p.startDateTimeUtc).isSame(moment(day), 'day')).filter((item) => !parallelSessions?.includes(item))
    }
  }



  public getSessionsBefore(session: SessionResource): SessionResource[] {
    return this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!.filter((p) =>
      session.description == p.description &&
      moment(session.endDateTimeUtc).isAfter(moment(p.startDateTimeUtc))
    );
  }

  public getOffsetToPreviousSessionInHours(session: SessionResource): number {
    let parallelSessions: SessionResource[] = this.getParallelSessions(this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!);
    let previousSession: SessionResource[] = [];
    if(parallelSessions.length == 0){
       previousSession = this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!
      .sort((p) => moment(session.endDateTimeUtc).diff(p.startDateTimeUtc))
      .filter((p) => moment(p.startDateTimeUtc).isBefore(session.endDateTimeUtc))
      .filter((p) => p.id != session.id);
    }
    if (parallelSessions.includes(session)) {
      previousSession = parallelSessions
      .sort((p) => moment(session.endDateTimeUtc).diff(p.startDateTimeUtc))
      .filter((p) => moment(p.startDateTimeUtc).isBefore(session.endDateTimeUtc))
      .filter((p) => p.id != session.id);
    } else {
      previousSession = this.getSessionsByDayandFilteredWithParallelSessions(session.startDateTimeUtc.split('T')[0])!
      .sort((p) => moment(session.endDateTimeUtc).diff(p.startDateTimeUtc))
      .filter((p) => moment(p.startDateTimeUtc).isBefore(session.endDateTimeUtc))
      .filter((p) => p.id != session.id);
      }
   
    if (previousSession.length > 0) {
      const duration = moment.duration(moment(session.startDateTimeUtc).diff(moment(previousSession[previousSession.length-1].endDateTimeUtc)));
      return duration.asHours();
    }
     else {
      return 0;
    }
  }

  public getParallelSessions(sessions: SessionResource[]): SessionResource[] {
    let pSessions: SessionResource[] = [];
    let p2Sessions: SessionResource[] = [];
    let result: SessionResource[] = [];
    const sortedSessions = sessions.sort((a) => moment(a.startDateTimeUtc).valueOf())

    for(let i= 0; i<sortedSessions.length; i++ ){
      let checkSession = sortedSessions[i];
     const otherSessions = sortedSessions.filter((p) => p.id != checkSession.id);
      if(this.isAnOverlapSession(otherSessions, checkSession)){
          pSessions.push(checkSession);
      }  
    }
    
    for(let i = 0; i < pSessions.length; i++) {
      let firstSession = pSessions[i];
      const otherSessions = pSessions.filter((p) => p.id != firstSession.id);
      if(!p2Sessions.includes(firstSession)){
        p2Sessions.push(...this.findOverlapSession(otherSessions, firstSession));
      }
    }

    result = [...new Set(p2Sessions)]
    return result;
  }

  public getStartOffset(session: SessionResource): number {
    const sortedSessions = this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!
      .sort((a) => moment(a.startDateTimeUtc).valueOf());

    let parallelSessions: SessionResource[] = this.getParallelSessions(this.getSessionsByDay(session.startDateTimeUtc.split('T')[0])!);

    const firstSessionPerTrack = this._distinctByTrack(sortedSessions)
      .sort((a) => moment(a.startDateTimeUtc).valueOf());


    if(parallelSessions.includes(session) && parallelSessions[0] == session){
      const duration = moment.duration(moment(session.startDateTimeUtc).diff(moment(sortedSessions[0].startDateTimeUtc)))
      return duration.asHours();
    }

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
   this.getSessionFromApi(this._eventId).subscribe((result) => {
     this._sessions = result.result.filter((p) => p.isMainSession == false);
     this._days = [...new Set(this._sessions?.map((s) => moment(s.startDateTimeUtc).toISOString().split('T')[0]))].sort();
   })
  }

  public setEventId(eventId: string){
    this._eventId = eventId;
  }

  public setTenantId(tenantId: string){
    this._tenantId = tenantId;
  }

  public getSessionFromApi(eventId: string): Observable<PagedResult<SessionResource>>{
    return this._http.get<PagedResult<SessionResource>>(`${this._settings.settings.backendUrl}/tenant/${this._tenantId}/Publishing/Event/${eventId}/sessions`, {
      params: new HttpParams().set('take', 100)
    })
  }

  private _distinctByTrack(array: SessionResource[]): SessionResource[] {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.startDateTimeUtc.split('T')[0])) {
        map.set(item.startDateTimeUtc.split('T')[0], true);    // set any value to Map
        result.push(item);
      }
    }

    return result;
  }


private isAnOverlapSession(sessionArray: SessionResource[], session: SessionResource){
  for (let i = 0; i < sessionArray.length; i++) {
    const eventA = sessionArray[i];

    // start-time in between any of the events
    if (session.startDateTimeUtc > eventA.startDateTimeUtc && session.startDateTimeUtc < eventA.endDateTimeUtc) {
        return true;
    }
    //end-time in between any of the events
    if (session.endDateTimeUtc > eventA.startDateTimeUtc && session.endDateTimeUtc < eventA.endDateTimeUtc) {
        return true;
    }
    //any of the events in between/on the start-time and end-time
    if (session.startDateTimeUtc <= eventA.startDateTimeUtc && session.endDateTimeUtc >= eventA.endDateTimeUtc) {
        return true;
    }
}
return false;
}



private findOverlapSession(sessionArray: SessionResource[], session: SessionResource): SessionResource[]{
 
 const result: SessionResource[] = [];
  for (let i = 0; i < sessionArray.length; i++) {
    const eventA = sessionArray[i];

    // start-time in between any of the events
    if (session.startDateTimeUtc > eventA.startDateTimeUtc && session.startDateTimeUtc < eventA.endDateTimeUtc) {
       result.push(eventA);
    }
    //end-time in between any of the events
    if (session.endDateTimeUtc > eventA.startDateTimeUtc && session.endDateTimeUtc < eventA.endDateTimeUtc) {
        result.push(eventA);
    }
    //any of the events in between/on the start-time and end-time
    if (session.startDateTimeUtc <= eventA.startDateTimeUtc && session.endDateTimeUtc >= eventA.endDateTimeUtc) {
        result.push(eventA);
    }
}
return result;
}


}
