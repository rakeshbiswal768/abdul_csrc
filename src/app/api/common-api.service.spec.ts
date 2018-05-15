import { TestBed, inject } from '@angular/core/testing';

import { CommonApiService } from './common-api.service';

describe('CommonApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonApiService]
    });
  });

  it('should be created', inject([CommonApiService], (service: CommonApiService) => {
    expect(service).toBeTruthy();
  }));
});
