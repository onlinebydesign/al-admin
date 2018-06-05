import { TestBed, inject } from '@angular/core/testing';

import { DataReportsService } from './data-reports.service';

describe('DataReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataReportsService]
    });
  });

  it('should be created', inject([DataReportsService], (service: DataReportsService) => {
    expect(service).toBeTruthy();
  }));
});
