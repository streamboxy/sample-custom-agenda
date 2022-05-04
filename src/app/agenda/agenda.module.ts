import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AgendaComponent } from './views/agenda.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import { DayComponent } from './components/day/day.component';
import { SessionComponent } from './components/session/session.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipeModule } from '../pipes/date-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);
@NgModule({
  declarations: [
    AgendaComponent,
    DayComponent,
    SessionComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    FontAwesomeModule,
    AgendaRoutingModule,
    DatePipeModule,
    TranslateModule.forChild(),
  ]
})
export class AgendaModule { }
