/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NfcGuardPatrolBaseService } from './nfc-guard-patrol-base.service';

describe('Service: NfcGuardPatrolBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NfcGuardPatrolBaseService]
    });
  });

  it('should ...', inject([NfcGuardPatrolBaseService], (service: NfcGuardPatrolBaseService) => {
    expect(service).toBeTruthy();
  }));
});
