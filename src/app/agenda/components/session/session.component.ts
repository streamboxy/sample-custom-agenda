import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionResource } from 'src/app/model/session.resource';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  get time(): string {
    return `${moment(this.session.startDateTimeUtc).format('hh:mm')} - ${moment(this.session.endDateTimeUtc).format('hh:mm')} ${this.duration}`;
  }

  get topMargin(): string {
    if (this.margin) {
      const offset = this._session.getOffsetToPreviousSessionInHours(this.session);
      const startOffset = this._session.getStartOffset(this.session);
      
      return `${(Math.max(offset, startOffset) * 400) + 12}px`;
    } else {
      return `12px`;
    }
  }

  get height(): string {
    const start = moment(this.session.startDateTimeUtc);
    const end = moment(this.session.endDateTimeUtc);
    const diff = end.diff(start);
    const duration = moment.duration(diff);


    return `${(duration.asHours() * 400) - 12}px`;
  }

  private get duration(): string {
    const start = moment(this.session.startDateTimeUtc);
    const end = moment(this.session.endDateTimeUtc);
    const diff = end.diff(start);

    return `(${moment.utc(diff).format("H:mm")}h)`;
  }

  @Input()
  session!: SessionResource;

  @Input()
  margin = true;

  constructor(
    private _session: SessionService
  ) { }

  ngOnInit(): void {
  }

}
