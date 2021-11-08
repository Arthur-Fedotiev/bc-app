import { TestBed } from '@angular/core/testing';

import { RealTimePriceService } from './real-time-price.service';

describe('RealTimePriceService', () => {
  let service: RealTimePriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimePriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
