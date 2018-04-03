import { TestBed, inject } from '@angular/core/testing';

import { DataFormsService } from './data-forms.service';

describe('DataFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFormsService]
    });
  });

  it('should be created', inject([DataFormsService], (service: DataFormsService) => {
    expect(service).toBeTruthy();
  }));
});
