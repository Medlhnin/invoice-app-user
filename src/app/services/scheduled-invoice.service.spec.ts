import { TestBed } from '@angular/core/testing';

import { ScheduledInvoiceService } from './scheduled-invoice.service';

describe('ScheduledInvoiceService', () => {
  let service: ScheduledInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
