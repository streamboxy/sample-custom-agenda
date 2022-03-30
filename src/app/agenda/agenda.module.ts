import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './views/agenda.component';
import { AgendaRoutingModule } from './agenda-routing.module';
import { DayComponent } from './components/day/day.component';
import { SessionComponent } from './components/session/session.component';



@NgModule({
  declarations: [
    AgendaComponent,
    DayComponent,
    SessionComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule { }
