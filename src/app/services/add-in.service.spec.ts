import { TestBed } from '@angular/core/testing';

import { AddInService } from './add-in.service';

describe('AddInService', () => {
  let service: AddInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
