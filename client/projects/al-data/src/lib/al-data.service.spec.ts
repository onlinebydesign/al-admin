import { TestBed, inject } from '@angular/core/testing';

import { AlDataService } from './al-data.service';

describe('AlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlDataService]
    });
  });

  it('should be created', inject([AlDataService], (service: AlDataService) => {
    expect(service).toBeTruthy();
  }));
});
