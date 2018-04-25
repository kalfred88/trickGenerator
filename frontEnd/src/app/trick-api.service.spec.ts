import { TestBed, inject } from '@angular/core/testing';

import { TrickApiService } from './trick-api.service';

describe('TrickApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrickApiService]
    });
  });

  it('should be created', inject([TrickApiService], (service: TrickApiService) => {
    expect(service).toBeTruthy();
  }));
});
