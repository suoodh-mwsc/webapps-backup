/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlinePaymentBaseService } from './online-payment-base.service';

describe('Service: OnlinePaymentBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlinePaymentBaseService]
    });
  });

  it('should ...', inject([OnlinePaymentBaseService], (service: OnlinePaymentBaseService) => {
    expect(service).toBeTruthy();
  }));
});
