import { TestBed } from '@angular/core/testing';

import { TariffStatusService } from './tariff-status.service';

describe('TariffStatusService', () => {
  let service: TariffStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
