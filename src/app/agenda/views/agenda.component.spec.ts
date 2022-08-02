import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { DayComponent } from '../components/day/day.component';

import { AgendaComponent } from './agenda.component';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  let routeStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;
  let sessionStub: Partial<SessionService>;

  beforeEach(async () => {
    routeStub = {
      queryParamMap: of()
    };

    routerStub = {};

    sessionStub = {
      getSessions: jasmine.createSpy('getSessions').and.returnValue([]),
      getSessionsByDay: jasmine.createSpy('getSessionsByDay').and.returnValue([])
    };

    await TestBed.configureTestingModule({
      imports:[
        TranslateModule.forRoot()
      ],
      declarations: [AgendaComponent, DayComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Router, useValue: routerStub },
        { provide: SessionService, useValue: sessionStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
