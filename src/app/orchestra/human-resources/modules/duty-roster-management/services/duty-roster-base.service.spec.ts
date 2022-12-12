/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DutyRosterBaseService } from './duty-roster-base.service';

describe('Service: DutyRosterBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterBaseService]
    });
  });

  it('should ...', inject([DutyRosterBaseService], (service: DutyRosterBaseService) => {
    expect(service).toBeTruthy();
  }));
});
