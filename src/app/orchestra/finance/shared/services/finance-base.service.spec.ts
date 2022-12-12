/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinanceBaseService } from './finance-base.service';

describe('Service: FinanceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceBaseService]
    });
  });

  it('should ...', inject([FinanceBaseService], (service: FinanceBaseService) => {
    expect(service).toBeTruthy();
  }));
});
