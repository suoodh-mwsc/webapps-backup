/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminconsoleBaseService } from './adminconsole-base.service';

describe('Service: AdminconsoleBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminconsoleBaseService]
    });
  });

  it('should ...', inject([AdminconsoleBaseService], (service: AdminconsoleBaseService) => {
    expect(service).toBeTruthy();
  }));
});
