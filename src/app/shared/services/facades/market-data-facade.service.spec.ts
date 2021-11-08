import { TestBed } from '@angular/core/testing';

import { MarketDataFacadeService } from './market-data-facade.service';

describe('MarketDataFacadeService', () => {
  let service: MarketDataFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketDataFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
