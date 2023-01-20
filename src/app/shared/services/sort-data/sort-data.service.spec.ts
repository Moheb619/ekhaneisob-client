import { TestBed } from '@angular/core/testing';

import { SortDataService } from './sort-data.service';

describe('SortDataService', () => {
  let service: SortDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
