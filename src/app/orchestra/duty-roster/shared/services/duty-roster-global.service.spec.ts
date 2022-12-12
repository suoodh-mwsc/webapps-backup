/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DutyRosterGlobalService } from './duty-roster-global.service';

describe('Service: DutyRosterGlobal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterGlobalService]
    });
  });

  it('should ...', inject([DutyRosterGlobalService], (service: DutyRosterGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
