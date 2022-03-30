import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  let routeStub: Partial<ActivatedRoute>;
  let sessionStub: Partial<SessionService>;

  beforeEach(async () => {
    routeStub = {
      queryParamMap: of()
    };

    sessionStub = {
      getSessionsByDay: jasmine.createSpy('getSessionsByDay').and.returnValue([])
    };

    await TestBed.configureTestingModule({
      declarations: [DayComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: SessionService, useValue: sessionStub }
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
