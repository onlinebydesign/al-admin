import { TestBed, inject } from '@angular/core/testing';

import { AlCoreService } from './al-core.service';

describe('AlCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlCoreService]
    });
  });

  it('should be created', inject([AlCoreService], (service: AlCoreService) => {
    expect(service).toBeTruthy();
  }));
});
