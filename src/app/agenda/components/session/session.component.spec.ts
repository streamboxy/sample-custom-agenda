import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BookabilityEnum } from 'src/app/model/bookability.enum';
import { VisibilityEnum } from 'src/app/model/visibility.enum';
import { SessionService } from 'src/app/services/session.service';

import { SessionComponent } from './session.component';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  let sessionStub: Partial<SessionService>;

  beforeEach(async () => {
    sessionStub = {
      getSessionsByDay: jasmine.createSpy('getSessionsByDay').and.returnValue([]),
      getOffsetToPreviousSessionInHours: jasmine.createSpy('getOffsetToPreviousSessionInHours'),
      getStartOffset: jasmine.createSpy('getStartOffset')
    };

    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        NgbTooltipModule
      ],
      declarations: [SessionComponent],
      providers: [
        { provide: SessionService, useValue: sessionStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;

    component.session = {
      "id": "3e3bf4dd-81e3-4c3e-949f-c016ca513f4c",
      "title": "Opening Keynote",
      "description": "",
      "imageSASUrl": "https://picsum.photos/640/360?random=1",
      "bookedByCurrentUser": false,
      "startDateTimeUtc": "2022-04-01T06:00:00.000Z",
      "endDateTimeUtc": "2022-04-01T06:45:00.000Z",
      "isMainSession": false,
      "bookability": BookabilityEnum.EventUser,
      "visibility": VisibilityEnum.Anonymous,
      "customProperties": {
        "stageTrack": "Main Stage"
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
