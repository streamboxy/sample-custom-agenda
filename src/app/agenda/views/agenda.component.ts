import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  isLoading = true;
  noItems = false;
  errorGettingItems = false;

  get days(): string[] {
    return this._session.days;
  }

  set days(val) {
    this._days = val;
  }
  _days!: string[];

  constructor(
    private _session: SessionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this._session.getSessions();
      this.days = this._session.days;
      if (this.days?.length > 0) {
        this.setDay(this.days[0]);
      } else {
        this.noItems = true;
      }
    } catch (ex) {
      console.error(ex);
      this.errorGettingItems = true;
    } finally {
      this.isLoading = false;
    }
  }

  setDay(day: string): void {
    this._router.navigate([], {
      queryParams: {
        day,
      },
      queryParamsHandling: 'merge',
    });
  }

  isActive(day: string): boolean {
    return moment(day).isSame(
      this._route.snapshot.queryParamMap.get('day'),
      'day'
    );
  }

  formatDay(day: string): string {
    return moment(day).format('DD.MM.YYYY');
  }

  convertDayString(day: string): Date {
    return moment(new Date(day)).toDate();
  }
}
