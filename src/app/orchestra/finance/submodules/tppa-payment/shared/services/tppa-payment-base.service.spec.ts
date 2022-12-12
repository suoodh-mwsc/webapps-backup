/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TppaPaymentBaseService } from './tppa-payment-base.service';

describe('Service: TppaPaymentBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TppaPaymentBaseService]
    });
  });

  it('should ...', inject([TppaPaymentBaseService], (service: TppaPaymentBaseService) => {
    expect(service).toBeTruthy();
  }));
});
