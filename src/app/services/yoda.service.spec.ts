import { TestBed, inject } from '@angular/core/testing';

import { YodaService } from './yoda.service';

describe('YodaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YodaService]
    });
  });

  it('should be created', inject([YodaService], (service: YodaService) => {
    expect(service).toBeTruthy();
  }));
});
