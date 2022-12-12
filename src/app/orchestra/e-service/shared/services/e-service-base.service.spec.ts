/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EServiceBaseService } from './e-service-base.service';

describe('Service: EServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EServiceBaseService]
    });
  });

  it('should ...', inject([EServiceBaseService], (service: EServiceBaseService) => {
    expect(service).toBeTruthy();
  }));
});
