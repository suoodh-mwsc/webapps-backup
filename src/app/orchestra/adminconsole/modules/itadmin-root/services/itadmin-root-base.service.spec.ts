/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItadminRootBaseService } from './itadmin-root-base.service';

describe('Service: ItadminRootBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItadminRootBaseService]
    });
  });

  it('should ...', inject([ItadminRootBaseService], (service: ItadminRootBaseService) => {
    expect(service).toBeTruthy();
  }));
});
