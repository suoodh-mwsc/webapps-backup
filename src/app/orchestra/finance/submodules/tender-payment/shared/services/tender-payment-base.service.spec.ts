/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenderPaymentBaseService } from './tender-payment-base.service';

describe('Service: TenderPaymentBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenderPaymentBaseService]
    });
  });

  it('should ...', inject([TenderPaymentBaseService], (service: TenderPaymentBaseService) => {
    expect(service).toBeTruthy();
  }));
});
