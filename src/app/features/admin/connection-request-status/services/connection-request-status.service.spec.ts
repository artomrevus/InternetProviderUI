import { TestBed } from '@angular/core/testing';

import { ConnectionRequestStatusService } from './connection-request-status.service';

describe('ConnectionRequestStatusService', () => {
  let service: ConnectionRequestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionRequestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
