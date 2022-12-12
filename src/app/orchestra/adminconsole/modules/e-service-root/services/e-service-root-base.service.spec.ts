/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EServiceRootBaseService } from './e-service-root-base.service';

describe('Service: EServiceRootBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EServiceRootBaseService]
    });
  });

  it('should ...', inject([EServiceRootBaseService], (service: EServiceRootBaseService) => {
    expect(service).toBeTruthy();
  }));
});
