/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlineApplicationBaseService } from './online-application-base.service';

describe('Service: OnlineApplicationBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineApplicationBaseService]
    });
  });

  it('should ...', inject([OnlineApplicationBaseService], (service: OnlineApplicationBaseService) => {
    expect(service).toBeTruthy();
  }));
});
