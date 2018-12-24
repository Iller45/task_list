import { TestBed } from '@angular/core/testing';

import { ResetTimeService } from './reset-time.service';

describe('ResetTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetTimeService = TestBed.get(ResetTimeService);
    expect(service).toBeTruthy();
  });
});
