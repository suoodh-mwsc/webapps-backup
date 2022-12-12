/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecruitmentBaseService } from './recruitment-base.service';

describe('Service: RecruitmentBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruitmentBaseService]
    });
  });

  it('should ...', inject([RecruitmentBaseService], (service: RecruitmentBaseService) => {
    expect(service).toBeTruthy();
  }));
});
