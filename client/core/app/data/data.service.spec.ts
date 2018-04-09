import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should add data', inject([DataService], (service: DataService) => {
    const testData = {
      id: 'testId',
      formId: 'testFormId',
      formVersion: 0,
      data: {testName: 'testValue'},
      created: null
    };

    service.save(testData);

    expect(service.getById('testId')).toEqual(testData);
  }));

  // public getById(id: string): Data {
  //   let foundData: Data;

  //   this.data.forEach((datum) => {
  //     if (datum.id === id) {
  //       foundData = datum;
  //     }
  //   });

  //   return foundData;
  // }

  // public getByFormId(formId: string): Data[] {
  //   return _.filter(this.data, {formId: formId});
  // }

  // public save(data: Data) {
  //   const existingData = this.getById(data.id);

  //   if (!existingData) {
  //     return this.add(data);
  //   }

  //   existingData.data = data.data;
  //   existingData.formVersion = data.formVersion;
  // }
});
