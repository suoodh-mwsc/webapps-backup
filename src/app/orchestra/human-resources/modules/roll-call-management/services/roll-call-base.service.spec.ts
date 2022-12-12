/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RollCallBaseService } from './roll-call-base.service';

describe('Service: RollCallBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RollCallBaseService]
    });
  });

  it('should ...', inject([RollCallBaseService], (service: RollCallBaseService) => {
    expect(service).toBeTruthy();
  }));
});
