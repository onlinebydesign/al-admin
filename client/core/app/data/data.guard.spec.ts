import { TestBed, async, inject } from '@angular/core/testing';

import { DataGuard } from './data.guard';

describe('DataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataGuard]
    });
  });

  it('should ...', inject([DataGuard], (guard: DataGuard) => {
    expect(guard).toBeTruthy();
  }));
});
