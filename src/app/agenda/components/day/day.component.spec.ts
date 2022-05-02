import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { SettingsService } from 'src/app/services/settings.service';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  let routeStub: Partial<ActivatedRoute>;
  let sessionStub: Partial<SessionService>;
  let settingsStub: Partial<SessionService>;

  beforeEach(async () => {
    routeStub = {
      queryParamMap: of()
    };

    sessionStub = {
      getSessionsByDay: jasmine.createSpy('getSessionsByDay').and.returnValue([]),
      getSessionsByDayandFilteredWithParallelSessions: jasmine.createSpy('getSessionsByDayandFilteredWithParallelSessions').and.returnValue([]),
      getParallelSessions: jasmine.createSpy('getParallelSessions').and.returnValue([])
    };

    await TestBed.configureTestingModule({
      declarations: [DayComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: SessionService, useValue: sessionStub },
        { provide: SettingsService, usevalue: settingsStub }
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
