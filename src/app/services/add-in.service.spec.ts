import { TestBed } from '@angular/core/testing';

import { AddInService } from './add-in.service';
import { LanguageService } from './language.service';

describe('AddInService', () => {
  let service: AddInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LanguageService, useValue: jasmine.createSpyObj('LanguageService', ['switchLanguage'] )}
      ]
    });
    service = TestBed.inject(AddInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
