/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminconsoleGlobalService } from './adminconsole-global.service';

describe('Service: AdminconsoleGlobal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminconsoleGlobalService]
    });
  });

  it('should ...', inject([AdminconsoleGlobalService], (service: AdminconsoleGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
