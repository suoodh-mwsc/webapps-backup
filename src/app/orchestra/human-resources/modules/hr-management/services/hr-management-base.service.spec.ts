/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrManagementBaseService } from './hr-management-base.service';

describe('Service: HrManagementBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrManagementBaseService]
    });
  });

  it('should ...', inject([HrManagementBaseService], (service: HrManagementBaseService) => {
    expect(service).toBeTruthy();
  }));
});
