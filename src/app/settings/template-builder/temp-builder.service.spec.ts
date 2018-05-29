import { TestBed, inject } from '@angular/core/testing';

import { TempBuilderService } from './temp-builder.service';

describe('TempBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TempBuilderService]
    });
  });

  it('should be created', inject([TempBuilderService], (service: TempBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
