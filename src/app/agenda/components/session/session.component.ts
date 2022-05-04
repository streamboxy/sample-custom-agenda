import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { SessionResource } from 'src/app/model/session.resource';
import { SessionService } from 'src/app/services/session.service';
import {
  faCalendar,
  faCalendarCheck,
  faCalendarPlus,
  faCheckSquare,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { IcsGenerator } from 'src/app/helpers/ics-generator';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  faCalendarCheck = faCalendarCheck;
  faCalendarPlus = faCalendarPlus;
  faPlusSquare = faPlusSquare;
  faCheckSquare = faCheckSquare;
  faCalendar = faCalendar;

  get tooltipIcs(): string {
    return this._translate.instant('session.ics-download');
  }
  get isBooked(): boolean {
    return this.session.bookedByCurrentUser;
  }

  get tooltip(): string {
    return this.isBooked ? this._translate.instant('session.booked') : this._translate.instant('session.add-to-agenda');
  }

  get time(): string {
    return `${moment(this.session.startDateTimeUtc).format('hh:mm')} - ${moment(
      this.session.endDateTimeUtc
    ).format('hh:mm')} ${this.duration}`;
  }

  get startTime(): Date {
    return moment(this.session.startDateTimeUtc).utc().toDate();
  }

  get endTime(): Date {
    return moment(this.session.endDateTimeUtc).utc().toDate();
  }

  get endFormat() {
    return moment(this.session.endDateTimeUtc).isSame(
      this.session.startDateTimeUtc,
      'day'
    )
      ? 'shortTime'
      : 'short';
  }

  get topMargin(): string {
    if (this.margin) {
      const offset = this._session.getOffsetToPreviousSessionInHours(
        this.session
      );
      const startOffset = this._session.getStartOffset(this.session);
      return `${Math.max(offset, startOffset) * 400 + 12}px`;
    } else {
      return `12px`;
    }
  }

  get height(): string {
    const start = moment(this.session.startDateTimeUtc);
    const end = moment(this.session.endDateTimeUtc);
    const diff = end.diff(start);
    const duration = moment.duration(diff);

    return `${duration.asHours() * 400 - 12}px`;
  }

  get duration(): number {
    const start = moment(this.session.startDateTimeUtc);
    const end = moment(this.session.endDateTimeUtc);
    const diff = end.diff(start, 'minutes');

    return diff;
  }

  @Input()
  session!: SessionResource;

  @Input()
  margin = true;

  @Output() onSessionBooked = new EventEmitter<any>();

  constructor(
    private _session: SessionService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {}

  book(sessionId: string): void {
    this._session.bookSessionForUser(sessionId).subscribe(async () => {
      await this._session.getSessions();
      this.onSessionBooked.emit();
    });
  }

  downloadIcs(session: SessionResource): void {
    IcsGenerator.DownloadIcs(
      session.startDateTimeUtc,
      session.endDateTimeUtc,
      session.title
    );
  }
}
