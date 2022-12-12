/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExternalPaymentBaseService } from './external-payment-base.service';

describe('Service: ExternalPaymentBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalPaymentBaseService]
    });
  });

  it('should ...', inject([ExternalPaymentBaseService], (service: ExternalPaymentBaseService) => {
    expect(service).toBeTruthy();
  }));
});
