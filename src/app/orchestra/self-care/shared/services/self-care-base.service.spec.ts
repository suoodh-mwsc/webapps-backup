/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelfCareBaseService } from './self-care-base.service';

describe('Service: SelfCareBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelfCareBaseService]
    });
  });

  it('should ...', inject([SelfCareBaseService], (service: SelfCareBaseService) => {
    expect(service).toBeTruthy();
  }));
});
