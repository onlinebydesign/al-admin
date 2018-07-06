import { TestBed, inject } from '@angular/core/testing';

import { AlAuthService } from './al-auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlAuthService]
    });
  });

  it('should be created', inject([AlAuthService], (service: AlAuthService) => {
    expect(service).toBeTruthy();
  }));
});
