/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacilityBookingBaseService } from './facility-booking-base.service';

describe('Service: FacilityBookingBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilityBookingBaseService]
    });
  });

  it('should ...', inject([FacilityBookingBaseService], (service: FacilityBookingBaseService) => {
    expect(service).toBeTruthy();
  }));
});
