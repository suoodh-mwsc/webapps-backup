/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrBaseService } from './hr-base.service';

describe('Service: HrBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrBaseService]
    });
  });

  it('should ...', inject([HrBaseService], (service: HrBaseService) => {
    expect(service).toBeTruthy();
  }));
});
