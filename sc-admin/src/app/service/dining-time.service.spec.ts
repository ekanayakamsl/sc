import { TestBed } from '@angular/core/testing';

import { DiningTimeService } from './dining-time.service';

describe('DiningTimeService', () => {
  let service: DiningTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiningTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
