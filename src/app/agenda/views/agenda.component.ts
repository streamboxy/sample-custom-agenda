import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  isLoading = true;

  get days(): string[] {
    return this._session.days;
  }

  constructor(
    private _session: SessionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this._session.getSessions();

      if (this.days?.length > 0) {
        this.setDay(this.days[0]);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      this.isLoading = false;
    }
  }

  setDay(day: string): void {
    this._router.navigate([], {
      queryParams: {
        day
      },
      queryParamsHandling: 'merge'
    })
  }

  isActive(day: string): boolean {
    return moment(day).isSame(this._route.snapshot.queryParamMap.get('day'), 'day');
  }

  formatDay(day: string): string {
    return moment(day).format("DD.MM.YYYY");
  }
}
