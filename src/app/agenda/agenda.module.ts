import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './views/agenda.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import { DayComponent } from './components/day/day.component';
import { SessionComponent } from './components/session/session.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



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
    AgendaRoutingModule
  ]
})
export class AgendaModule { }
